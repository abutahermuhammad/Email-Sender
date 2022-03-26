import Link from "next/link";

const Header = () => {
    return (
        <>
            <header className="ef_navbar">
                <nav>
                    <Link href={`/`}>
                        <a>EmailForm</a>
                    </Link>
                </nav>
            </header>
        </>
    );
};

export default Header;
