/**
 * getRandomNumber
 *
 * @description This function generates random number within given number length.
 * @param {Number} max
 * @returns {Number}
 */
export const getRandomNumber = (max) => {
    // Generating Random Number
    let tempInt = Math.floor(Math.random() * max);

    // Checking Generated number's length.
    if (tempInt.toString().length == 4) {
        return tempInt;
    }

    // When Generated number's length bellow 4 generating another one.
    getRandomNumber(max);
};
