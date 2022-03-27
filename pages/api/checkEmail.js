// Importing Validator Controller
import cors from "cors";
import { validateEmail } from "../../utils/email.utils";

// Initializing the CORS
cors();

// API Component
export default async function handler(req, res) {
	const { email } = req.query;

	res.json({ ...(await validateEmail(email)) });
}
