import { useContext, useState } from "react";
import { EmailContext } from "../contexts/EmailContext";

// Email Features Component
export const EmailFunctions = () => {
    const [info, setInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

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
        let status = false;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/sendEmail?email=${email}&rfi=${refferalID}`;

        if (CYCLE <= 3) {
            CYCLE += 1;
            await fetch(url)
                .then((res) => res.json())
                .then((data) => (status = true))
                .catch((err) => (status = false));
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}/checkEmail?email=${email}`;
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
export const useEmail = () => {
    const emailCTX = useContext(EmailContext);

    return emailCTX;
};

export default useEmail;
