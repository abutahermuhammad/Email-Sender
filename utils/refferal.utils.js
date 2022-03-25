import { getRandomNumber } from "./number.utils";
import { emailToString, first2Char, last2Char } from "./string.utils";

export const generateReferId = (values) => {
    /**
     * ID Structure:
     *  1st: 4 Char () => Random Number.
     *  2nd: 4 Char (FIRST NAME)=> 1st and last two character from first name.
     *  3rd: 4 Char (LAST NAME)=> 1st and last two character from last name.
     *  4th: 5-6 Char (DATE)=> DD-YY-MM format.
     *  5th: 4 Char (EMAIL)=> First 2 character from email domain and full top label domain.
     */
    let tempId = "";

    // Random Number.
    tempId += `${getRandomNumber(4099)}`;

    // First Name
    tempId += `-${first2Char(values.firstName)}${last2Char(values.firstName)}`;

    // Last Name
    tempId += `-${first2Char(values.lastName)}${last2Char(values.lastName)}`;

    // Date
    tempId += `-${new Date().getUTCDate()}${last2Char(
        new Date().getUTCFullYear()
    )}${new Date().getUTCMonth()}`;

    // Email
    tempId += `-${emailToString(values.email)}`;
    console.log(tempId);

    // Here I got an issue in the first place of the generated ID.
    // To avoid faulty ID here I'm checking the newly generated ID.
    // If everything well than I'm return the ID.
    if (!tempId.slice("-")?.includes("undefined")) return tempId.toUpperCase();

    // If the newly generated ID faulty? I'm calling the function itself
    // recursively for generating new ID.
    return generateReferId(values);
};
