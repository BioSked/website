export function canonicalInternalHref(href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const match = href.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return href;

  const [, pathname, suffix = ''] = match;
  if (
    pathname === '/' ||
    pathname.endsWith('/') ||
    pathname.startsWith('/api/') ||
    /\/[^/]+\.[^/]+$/.test(pathname)
  ) {
    return href;
  }

  return `${pathname}/${suffix}`;
}
