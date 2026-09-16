#!/usr/bin/env bash
set -euo pipefail

for attempt in 1 2 3; do
  outcome_var="ATTEMPT_${attempt}_OUTCOME"
  url_var="ATTEMPT_${attempt}_URL"
  if [[ "${!outcome_var:-}" == "success" ]]; then
    url="${!url_var:-}"
    if [[ "$url" != https://* || "$url" == *$'\n'* || "$url" == *$'\r'* ]]; then
      printf '::error::Successful deployment did not return a valid HTTPS page URL.\n'
      exit 1
    fi
    printf 'page_url=%s\n' "$url" >> "$GITHUB_OUTPUT"
    printf 'GitHub Pages deployment succeeded on attempt %s.\n' "$attempt"
    exit 0
  fi
done

printf '::error::No GitHub Pages deployment attempt succeeded. Check the attempt logs; persistent failures are not suppressed.\n'
exit 1
