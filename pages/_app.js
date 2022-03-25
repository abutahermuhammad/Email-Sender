import { EmailContext } from "../contexts/EmailContext";
import { EmailFunctions } from "../hooks/useEmail";
import "../styles/globals.sass";

function MyApp({ Component, pageProps }) {
    const eF = EmailFunctions();
    return (
        <EmailContext.Provider value={eF}>
            <Component {...pageProps} />
        </EmailContext.Provider>
    );
}

export default MyApp;
