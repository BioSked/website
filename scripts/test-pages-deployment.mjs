import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const workflows = ['deploy.yml', 'kb-refresh.yml'];

test('both publishing workflows use the shared bounded-retry deployment', () => {
  for (const file of workflows) {
    const source = readFileSync(resolve(root, '.github/workflows', file), 'utf8');
    const deploy = source.split('\n  deploy:\n')[1];
    assert.ok(deploy, `${file}: deployment job exists`);
    assert.match(deploy, /uses: \.\/\.github\/actions\/deploy-pages-retry/, `${file}: startup failures need whole-action retry`);
    assert.match(deploy, /contents: read/);
    assert.match(deploy, /pages: write/);
    assert.match(deploy, /id-token: write/);
    assert.match(deploy, /persist-credentials: false/);
    assert.match(deploy, /timeout-minutes: 35/);
    assert.match(deploy, /url: \$\{\{ steps\.deployment\.outputs\.page_url \}\}/);
    assert.match(source, /group: pages\n  cancel-in-progress: false/);
    assert.match(source, /run: node --test scripts\/test-pages-deployment\.mjs/);
    assert.doesNotMatch(deploy, /continue-on-error:/, 'the job must not suppress persistent failures');
  }
});

const actionDir = resolve(root, '.github/actions/deploy-pages-retry');
const action = readFileSync(resolve(actionDir, 'action.yml'), 'utf8');
// This deliberately small harness accepts only the condition forms we use.
// The workflow syntax is separately checked with actionlint and real CI.
const steps = action.split(/^    - name: /m).slice(1).map(block => ({
  name: block.split('\n')[0],
  id: block.match(/^      id: (\w+)$/m)?.[1],
  condition: block.match(/^      if: (.+)$/m)?.[1],
  provider: block.match(/^      uses: (.+)$/m)?.[1],
  delay: Number(block.match(/^      run: sleep (\d+)$/m)?.[1] || 0),
  block,
}));

function shouldRun(condition, outcomes, cancelled) {
  if (!condition || condition === '${{ !cancelled() }}') return !cancelled;
  const match = condition.match(/^\$\{\{ !cancelled\(\) && steps\.(attempt_[123])\.outcome == 'failure' \}\}$/);
  assert.ok(match, `unrecognised or unsafe condition: ${condition}`);
  return !cancelled && outcomes[match[1]] === 'failure';
}

function finalize(outcomes, urls) {
  const dir = mkdtempSync(resolve(tmpdir(), 'pages-result-'));
  try {
    const output = resolve(dir, 'output');
    const env = { PATH: process.env.PATH, GITHUB_OUTPUT: output };
    for (let i = 1; i <= 3; i++) {
      env[`ATTEMPT_${i}_OUTCOME`] = outcomes[`attempt_${i}`] || '';
      env[`ATTEMPT_${i}_URL`] = urls[`attempt_${i}`] || '';
    }
    const result = spawnSync('bash', [resolve(actionDir, 'result.sh')], { env, encoding: 'utf8' });
    assert.ifError(result.error);
    return { status: result.status, stdout: result.stdout, output: existsSync(output) ? readFileSync(output, 'utf8') : '' };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function simulate(providerOutcomes, { cancelAfter = Infinity } = {}) {
  const outcomes = {}, urls = {}, delays = [];
  let attempts = 0, result = null;
  for (const step of steps) {
    if (!shouldRun(step.condition, outcomes, attempts >= cancelAfter)) continue;
    if (step.provider) {
      outcomes[step.id] = providerOutcomes[attempts++] || 'failure';
      // Failed upstream attempts can still have emitted a URL; do not select it.
      urls[step.id] = `https://example.invalid/${step.id}`;
    } else if (step.delay) {
      delays.push(step.delay);
    } else if (step.id === 'result') {
      result = finalize(outcomes, urls);
    } else {
      assert.fail(`Unexpected step: ${step.name}`);
    }
  }
  return { attempts, delays, result };
}

test('shared action pins three official attempts with explicit current-run artifact and timeout', () => {
  const attempts = steps.filter(s => s.provider);
  assert.equal(attempts.length, 3);
  assert.deepEqual(attempts.map(s => s.id), ['attempt_1', 'attempt_2', 'attempt_3']);
  for (const step of attempts) {
    assert.equal(step.provider, 'actions/deploy-pages@cd2ce8fcbc39b97be8ca5fce6e763baed58fa128 # v5.0.0');
    assert.match(step.block, /continue-on-error: true/);
    assert.match(step.block, /token: \$\{\{ github\.token \}\}/);
    assert.match(step.block, /artifact_name: github-pages/);
    assert.match(step.block, /timeout: '600000'/);
  }
  const result = steps.find(s => s.id === 'result');
  assert.equal(result.condition, '${{ !cancelled() }}');
  assert.doesNotMatch(result.block, /continue-on-error/);
  assert.match(result.block, /run: bash "\$GITHUB_ACTION_PATH\/result.sh"/);
  assert.match(action, /value: \$\{\{ steps\.result\.outputs\.page_url \}\}/);
  for (let i = 1; i <= 3; i++) {
    assert.ok(result.block.includes(`ATTEMPT_${i}_OUTCOME: \${{ steps.attempt_${i}.outcome }}`));
    assert.ok(result.block.includes(`ATTEMPT_${i}_URL: \${{ steps.attempt_${i}.outputs.page_url }}`));
  }
});

test('success on first attempt neither sleeps nor deploys again', () => {
  const got = simulate(['success']);
  assert.equal(got.attempts, 1);
  assert.deepEqual(got.delays, []);
  assert.equal(got.result.status, 0);
  assert.equal(got.result.output, 'page_url=https://example.invalid/attempt_1\n');
});

test('transient startup failure recovers after 30 seconds', () => {
  const got = simulate(['failure', 'success']);
  assert.equal(got.attempts, 2);
  assert.deepEqual(got.delays, [30]);
  assert.equal(got.result.status, 0);
  assert.equal(got.result.output, 'page_url=https://example.invalid/attempt_2\n');
});

test('two startup failures recover after bounded 30/60 second backoff', () => {
  const got = simulate(['failure', 'failure', 'success']);
  assert.equal(got.attempts, 3);
  assert.deepEqual(got.delays, [30, 60]);
  assert.equal(got.result.status, 0);
  assert.equal(got.result.output, 'page_url=https://example.invalid/attempt_3\n');
});

test('persistent failure remains a real failure and never tries a fourth deployment', () => {
  const got = simulate(['failure', 'failure', 'failure', 'success']);
  assert.equal(got.attempts, 3);
  assert.equal(got.result.status, 1);
  assert.equal(got.result.output, '');
});

for (const cancelAfter of [0, 1, 2]) {
  test(`cancellation after ${cancelAfter} attempts stops recovery without claiming success`, () => {
    const got = simulate(['failure', 'failure', 'success'], { cancelAfter });
    assert.equal(got.attempts, cancelAfter);
    assert.equal(got.result, null);
  });
}

test('absent or skipped attempts fail closed even if URLs exist', () => {
  for (const outcome of ['', 'skipped', 'cancelled', 'failure']) {
    const got = finalize({ attempt_1: outcome }, { attempt_1: 'https://example.invalid/not-deployed' });
    assert.equal(got.status, 1);
    assert.equal(got.output, '');
  }
});

test('success cannot emit a missing, insecure or multiline URL', () => {
  for (const url of ['', 'http://example.invalid', 'https://example.invalid/\nextra=bad', 'https://example.invalid/\rbad']) {
    const got = finalize({ attempt_1: 'success' }, { attempt_1: url });
    assert.equal(got.status, 1);
    assert.equal(got.output, '');
  }
});

test('pull requests remain build-only with no artifact publication or privileged deployment', () => {
  const source = readFileSync(resolve(root, '.github/workflows/deploy.yml'), 'utf8');
  assert.match(source, /name: Upload Pages artifact\n        if: github\.event_name != 'pull_request'/);
  assert.match(source, /\n  deploy:\n    if: github\.event_name != 'pull_request'/);
});
