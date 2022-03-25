import { useContext, useState } from "react";
import { EmailContext } from "../contexts/EmailContext";

// Email Features Component
export const EmailFunctions = () => {
    const [info, setInfo] = useState({});

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

    return { info, setInfo, sendEmail };
};

// Email Context hook
export const useEmail = () => {
    const emailCTX = useContext(EmailContext);

    return emailCTX;
};

export default useEmail;
