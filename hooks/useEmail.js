import { useContext, useState } from "react";
import { EmailContext } from "../contexts/EmailContext";

// Email Features Component
export const EmailFunctions = () => {
    const [info, setInfo] = useState({});
    const [emailStatus, setEmailStatus] = useState();

    const sendEmail = (id) => {
        let CYCLE = 0;
        let message = undefined;

        if (CYCLE <= 3) {
            CYCLE += 1;
            message = "successful";
            console.log(id, message);
        }

        return message;
    };

    // Email Checker
    const checkEmail = async (email) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/checkEmail?email=${email}`;

        await fetch(url)
            .then((res) => res.json())
            .then((data) => setEmailStatus(data.valid));

        return emailStatus;
    };
    console.log("EMAIL STATUS: ", emailStatus);

    return { info, setInfo, sendEmail, checkEmail };
};

// Email Context hook
export const useEmail = () => {
    const emailCTX = useContext(EmailContext);

    return emailCTX;
};

export default useEmail;
