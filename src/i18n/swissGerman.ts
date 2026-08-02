/** Convert standard German copy to Swiss Standard German orthography. */
export function toSwissGerman<T>(value: T): T {
    if (typeof value === 'string') return value.replaceAll('ß', 'ss') as T;
    if (Array.isArray(value)) return value.map((item) => toSwissGerman(item)) as T;
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, toSwissGerman(item)]),
        ) as T;
    }
    return value;
}
