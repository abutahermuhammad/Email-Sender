import { MessageContext } from "../contexts/MessageContext";
import { MessageFunctions } from "../hooks/useMessage";
import "../styles/globals.sass";

function MyApp({ Component, pageProps }) {
    const eF = MessageFunctions();

    return (
        <MessageContext.Provider value={eF}>
            <Component {...pageProps} />
        </MessageContext.Provider>
    );
}

export default MyApp;
