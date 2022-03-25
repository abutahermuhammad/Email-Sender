// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import validate from "deep-email-validator";
export default function handler(req, res) {
    const validateEmail = async (email) => {
        return validate({
            email: email,
            sender: email,
            validateRegex: true,
            validateMx: true,
            validateTypo: true,
            validateDisposable: true,
            validateSMTP: true,
        });
    };

    let result = validateEmail("abut1081@gmail.com");

    console.log(result);

    res.status(200).json(result);
}
