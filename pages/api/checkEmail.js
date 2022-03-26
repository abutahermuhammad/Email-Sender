// Importing Validator Controller
import { validateEmail } from "../../utils/email.utils";

// API Component
export default async function handler(req, res) {
    const { email } = req.query;

    res.json({ ...(await validateEmail(email)) });
}
