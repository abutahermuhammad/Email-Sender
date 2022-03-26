/**
 * first2char
 *
 * @description Return first 2 character of a given string.
 * @param {String} string
 * @return {String}
 */
export const first2Char = (string) => {
    // Replacing the space with 0.
    let stringValue = string.toString().split(" ").join("0");

    // When given string length equal to 1 repeating the string two times.
    if (stringValue.length <= 1) return stringValue.repeat(2);

    // Returning first 2 character of string.
    return stringValue.substring(0, 2);
};

/**
 * last2char
 *
 * @description Return last 2 character of a given string.
 * @param {string} string
 * @returns {String}
 */
export const last2Char = (string) => {
    // Replacing the space with 0.
    let stringValue = string.toString().split(" ").join("0");
    // Total length of the given string.
    let stringLength = stringValue.length;

    // When given string length equal to 1 repeating the string two times.
    if (stringLength <= 1) return stringValue.repeat(2);

    // Returning last 2 character of string.
    return stringValue.substring(stringLength - 2, stringLength);
};

/**
 * emailToString
 *
 * @description Generate a string made from first 2 character of the email domain and full top label domain.
 * @param {String} string
 * @returns {String}
 */
export const emailToString = (str) => {
    let finalStr = "";
    let stringValue = str.toString()?.split("@")[1]?.split("."); // Replacing the space with 0.
    finalStr += first2Char(stringValue[0]);
    finalStr += stringValue[1];

    return finalStr;
};
