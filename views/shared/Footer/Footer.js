import Link from "next/link";

const Footer = () => {
    return (
        <>
            <footer className="ef_footer">
                <p>
                    Made with ❤ by
                    <Link href={`https://at-mah.vercel.app`}>
                        <a target="_blank"> Abu Taher Muhammad</a>
                    </Link>
                </p>
            </footer>
        </>
    );
};

export default Footer;
