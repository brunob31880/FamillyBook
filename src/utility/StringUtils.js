/**
 * 
 * @param {*} str 
 * @param {*} len 
 * @returns 
 */
export function truncateString(str, len) {
    if (str.length > len) {
        return str.substring(0, len) + "...";
    }
    return str;
}