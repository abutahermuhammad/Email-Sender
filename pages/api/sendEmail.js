import { sendEmail } from "../../utils/email.utils";

/**
 * @description his function takes two parameter; email => Receiver Email; rfi => Referral ID.
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
    const { email, rfi } = req.query;

    // SendGrid Email Sender
    let status = sendEmail(email, rfi);

    // Response
    res.json({ status });
}
