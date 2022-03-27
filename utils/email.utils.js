import sgMail from "@sendgrid/mail";
import validate from "deep-email-validator";
import { emailTemplate } from "../db/constant.db";
import { toBoolean } from "./tools.utils";

/*=========================================*/
/* Email Validator                         */
/*=========================================*/
// Email Validator Configuration. This configuration can be changed
// anytime throughout the environment variable.
const EV_REGEX = toBoolean(process.env.NEXT_PUBLIC_EV_REGEX) || true;
const EV_MX = toBoolean(process.env.NEXT_PUBLIC_EV_MX) || true;
const EV_TYPO = toBoolean(process.env.NEXT_PUBLIC_EV_TYPO) || true;
const EV_DISPOSABLE = toBoolean(process.env.NEXT_PUBLIC_EV_DISPOSABLE) || true;
const EV_SMTP = toBoolean(process.env.NEXT_PUBLIC_EV_SMTP) || false;

/**
 * validateEmail
 *
 * @description This function checks email validation in deeply as much as possible.
 * @param {String} email
 * @returns
 */
export const validateEmail = (email) => {
	return validate({
		email: email,
		validateRegex: EV_REGEX,
		validateMx: EV_MX,
		validateTypo: EV_TYPO,
		validateDisposable: EV_DISPOSABLE,
		validateSMTP: EV_SMTP,
	});
};

/*=========================================*/
/* Email Sender                            */
/*=========================================*/
// SendGrid Configuration.
const SG_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;
const EMAIL_FROM = process.env.NEXT_PUBLIC_SG_SENDER;
const SUBJECT =
	process.env.NEXT_PUBLIC_SG_EMIAIL_SUBJECT || "EmailForm Referral ID";

// SendGrid Client Initialization
// It is initialized out of component function to avoid unusual rendering.
sgMail.setApiKey(SG_API_KEY);

/**
 * sendEmail()
 *
 * @description This function takes two parameter; email => Receiver Email; rfi => Referral ID.
 * @param {String} email
 * @param {String} rfi
 * @returns
 */
export const sendEmail = async (email, rfi) => {
	let status; // SendGrid API Response status.

	// Message Object. Here described message routing and message body contents.
	// Any kind of email template can be added here.
	const msg = {
		to: email, // Recipient
		from: EMAIL_FROM, // Verified Sender
		subject: SUBJECT, // Email Subject
		text: `Referral ID: ${rfi}`, // For legacy browser or text version of email.
		html: emailTemplate(rfi), // HTML version of email. It contains modern email template. For modern browsers.
	};

	// Sending Email. When Operation successful declaring it as successful. Otherwise it is an internal server issue.
	await sgMail
		.send(msg)

		.then(() => (status = 200))
		.catch(() => (status = 500));

	return status;
};
