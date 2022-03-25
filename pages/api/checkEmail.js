// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import validate from "deep-email-validator";

/**
 * validateEmail
 *
 * @description This function checks email validation in deeply as much as possible.
 * @param {*} email
 * @returns
 */
const validateEmail = (email) => {
    // return validate("healal.ahmed180@gmail.com");
    return validate({
        email: email,
        // sender: email,
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: true,
    });
};

export default async function handler(req, res) {
    const { email } = req.query;

    console.log(email);

    res.json({ ...(await validateEmail(email)) });
}
