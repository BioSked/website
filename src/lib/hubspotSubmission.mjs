const CONTACT_OBJECT_TYPE_ID = '0-1';
const CONTACT_FIELDS = [
  'firstname',
  'lastname',
  'email',
  'company',
  'numemployees',
  'message',
];

export function getCookieValue(cookieString, name) {
  const prefix = `${name}=`;
  for (const segment of String(cookieString || '').split(';')) {
    const cookie = segment.trim();
    if (!cookie.startsWith(prefix)) continue;
    const value = cookie.slice(prefix.length);
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }
  return '';
}

export function buildHubSpotSubmission({
  values,
  pageUri,
  pageName,
  hutk,
  submittedAt = Date.now(),
}) {
  if (!values || typeof values !== 'object') {
    throw new TypeError('HubSpot submission values must be an object');
  }

  const fields = CONTACT_FIELDS.flatMap((name) => {
    const value = values[name] == null ? '' : String(values[name]).trim();
    return value ? [{ objectTypeId: CONTACT_OBJECT_TYPE_ID, name, value }] : [];
  });

  const context = {};
  if (hutk) context.hutk = String(hutk);
  if (pageUri) context.pageUri = String(pageUri);
  if (pageName) context.pageName = String(pageName);

  return {
    submittedAt: String(submittedAt),
    fields,
    context,
  };
}
