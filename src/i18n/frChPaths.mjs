/** French route remainders that have dedicated Swiss-French pages. */
export const FR_CH_LOCAL = [
  '/',
  '/pricing',
  '/demo',
  '/getquote',
  '/securite-donnees',
  '/mentions-legales',
];

/**
 * Map a French URL to its explicit Swiss-French twin.
 * Trailing slashes, query strings, and fragments are preserved.
 *
 * @param {string} href
 * @returns {string}
 */
export function frChLocalPathFor(href) {
  const match = href.match(/^([^?#]*)(.*)$/);
  if (!match) return href;

  const [, pathname, suffix] = match;
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const rest = clean === '/fr'
    ? '/'
    : clean.startsWith('/fr/')
      ? clean.slice(3) || '/'
      : null;

  if (!rest || !FR_CH_LOCAL.includes(rest)) return href;
  const base = `/fr-ch${rest === '/' ? '' : rest}`;
  return `${base}${pathname.endsWith('/') ? '/' : ''}${suffix}`;
}
