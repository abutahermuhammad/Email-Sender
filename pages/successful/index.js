import Layout from "../../views/shared/Layout/Layout";

const Successful = () => {
    return (
        <>
            <Layout>
                <section className="es_successful">
                    <div className="es_container">
                        <h1 className="es_successful--title">
                            Your referral ID generated successfully!
                        </h1>
                        <h4 className="es_successful--subtitle">
                            Please check your email
                        </h4>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Successful;
