/**
 * first2char
 *
 * @description Return first 2 character of a given string.
 * @param {*} string
 * @returns
 */
export const first2Char = (string) => {
    let stringValue = string.toString().split(" ").join("0"); // Replacing the space with 0.

    // When first name length 1 repeating the string two times.
    if (stringValue.length <= 1) return stringValue.repeat(2);

    return stringValue.substring(0, 2);
};

/**
 * last2char
 *
 * @description Return last 2 character of a given string.
 * @param {*} string
 * @returns
 */
export const last2Char = (string) => {
    let stringValue = string.toString().split(" ").join("0"); // Replacing the space with 0.
    let stringLength = stringValue.length;

    if (stringLength <= 1) return stringValue.repeat(2);

    return stringValue.substring(stringLength - 2, stringLength);
};

/**
 * emailToString
 *
 * @description Return last 2 character of a given string.
 * @param {*} string
 * @returns
 */
export const emailToString = (str) => {
    let finalStr = "";
    let stringValue = str.toString()?.split("@")[1]?.split("."); // Replacing the space with 0.
    finalStr += first2Char(stringValue[0]);
    finalStr += stringValue[1];

    return finalStr;
};
