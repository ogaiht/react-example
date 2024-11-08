export function createQueryString(values:any): string {
    if (!values) {
        return '';
    }
    const queryString =  Object.getOwnPropertyNames(values)
        .map(p => !!p ? `${p}=${values[p]}` : '')
        .join('&');
    return queryString ? `?${queryString}` : '';
}