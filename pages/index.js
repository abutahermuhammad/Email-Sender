import EmailForm from "../views/pages/home/EmailForm/EmailForm";
import Layout from "../views/shared/Layout/Layout";

const Home = () => {
    return (
        <>
            <Layout className="landing">
                {/* Email Component */}
                <EmailForm />
            </Layout>
        </>
    );
};

export default Home;
