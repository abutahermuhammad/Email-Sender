import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Meta from "../Meta/Meta";

const Layout = ({ className, children }) => {
    return (
        <>
            {/* Webpage meta tags */}
            <Meta />

            {/* Webpage Header */}
            <Header />

            {/* Webpage Body */}
            <main className={`ef_page ${className}`}>{children}</main>

            {/* Webpage Footer */}
            <Footer />

            {/**
             * I'm trying to follow up W3C roles HTML5 semantic tags.
             *
             */}
        </>
    );
};

export default Layout;
