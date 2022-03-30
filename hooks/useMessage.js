import { useContext, useState } from "react";
import { MessageContext } from "../contexts/MessageContext";

export const MessageFunctions = () => {
	const [info, setInfo] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const API_URL = process.env.NEXT_PUBLIC_API_URL;

	/**
	 * sendEmail
	 *
	 * @description This function take email and referral ID as argument and send referral ID to that email.
	 * @param {*} email
	 * @param {*} refferalID
	 * @returns
	 */
	const sendEmail = async (email, refferalID) => {
		let CYCLE = 0;
		let error;
		let status;
		const url = `${API_URL}/sendEmail?email=${email}&rfi=${refferalID}`;
		// const url = `${API_URL}/sendEmaail?email=${email}&rfi=${refferalID}`;  //This line can be unchecked for testing out how the 'CYCLE' concept works.

		if (CYCLE < 3) {
			for (CYCLE; CYCLE < 3; CYCLE++) {
				await fetch(url)
					.then((res) => res.json())
					.then(() => (status = true))
					.catch(() => (status = false));

				if (status) return status;
			}
		}

		return status;
	};

	/**
	 * checkEmail
	 *
	 * @description This function take email as an argument and check this email. If everything went well? Than it will return an boolean status.
	 * @param {*} email
	 * @returns
	 */
	const checkEmail = async (email) => {
		const url = `${API_URL}/checkEmail?email=${email}`;
		let status = false;

		await fetch(url)
			.then((res) => res.json())
			.then((data) => (status = data.valid));

		return status;
	};

	// Component Returns
	return {
		info,
		setInfo,
		errorMessage,
		setErrorMessage,
		sendEmail,
		checkEmail,
	};
};

// Email Context hook
export const useMessage = () => {
	const messageCTX = useContext(MessageContext);

	return messageCTX;
};

export default useMessage;
