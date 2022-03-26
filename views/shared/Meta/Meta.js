import Head from "next/head";

const Meta = () => {
    return (
        <Head>
            {/* Visualization Related Tags */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale-1"
            />

            {/* SEO Related Tags */}
            <meta
                name="description"
                content="Referral ID generator component with email send facility."
            />

            {/* Core Tags */}
            <title>EmailForm</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default Meta;
