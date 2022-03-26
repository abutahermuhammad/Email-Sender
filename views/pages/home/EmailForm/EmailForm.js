import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import useEmail from "../../../../hooks/useEmail";
import { generateReferId } from "../../../../utils/refferal.utils";

const EmailForm = () => {
    const router = useRouter();
    const [formMessage, setFormMessage] = useState("Validating email...");
    const { errorMessage, sendEmail, checkEmail } = useEmail();

    // Submit Button Handler
    const setReferIdHandler = async (values, setSubmitting) => {
        let emailValidity = false;
        let referralID = "";
        let emailSended = false;

        await setSubmitting(true);

        // Validating Email
        try {
            emailValidity = await checkEmail(values.email);
            console.log("EMAIL VALIDATION: ", emailValidity);
        } catch {
            setFormMessage("Something went wrong!");
            console.error("Can't check email validation.");
            // setSubmitting(false);
        }

        // When Email Validated I'm moving to next state to generate a unique referral ID/
        if (!errorMessage && emailValidity) {
            setFormMessage("Generating ID...");

            referralID = await generateReferId(values);
            console.log("REFERRAL ID: ", referralID);

            if (!referralID) errorMessage("An error occurred on ID generation");
        }

        if (!errorMessage && referralID) {
            setFormMessage("Sending email...");
            // setReferId(referralID);

            try {
                emailSended = await sendEmail(values.email, referralID);
                console.log("EMAIL SENDED: ", emailSended);
            } catch {
                console.log("Can not send email.");

                if (!referralID)
                    errorMessage("An error occurred on sending email");
            }
        }

        if (!errorMessage && emailValidity && referralID && emailSended) {
            setFormMessage("Redirecting...");
            await router.push(`/successful`);
        } else {
            setFormMessage("Something went wrong!");
            if (errorMessage) errorMessage("Something went wrong!");
            // setSubmitting(false);
        }

        // setSubmitting(false);
    };

    return (
        <>
            <section className="ef_emailForm">
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        email1: "",
                    }}
                    validate={(values) => {
                        const errors = {}; // Error Object

                        // First Name Validation
                        if (!values.firstName) {
                            errors.firstName = "Required";
                        }

                        // Last Name Validation
                        if (!values.lastName) {
                            errors.lastName = "Required";
                        }

                        // Email Validation
                        if (!values.email) {
                            errors.email = "Required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid email address";
                        } else if (values.email !== values.email1) {
                            errors.email = "Email not match";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) =>
                        setReferIdHandler(values, setSubmitting)
                    }
                >
                    {({ errors, isSubmitting }) => (
                        <Form className="ef_emailForm-form">
                            {/* Error alert */}
                            {errorMessage && (
                                <div className={`ef_emailForm--error`}>
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            <div className="ef_emailForm-content">
                                {/* Form Title */}
                                <h4 className="ef_emailForm--title">
                                    Generate your Referral code
                                </h4>

                                {isSubmitting || errorMessage ? (
                                    <>
                                        <div className="es_emailForm--state">
                                            <p>{formMessage}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Name Area */}
                                        <div className="ef_emailForm--field --name">
                                            {/* First Name Field */}
                                            <Field
                                                className={
                                                    errors.firstName
                                                        ? `__error`
                                                        : ""
                                                }
                                                placeholder="First name"
                                                name="firstName"
                                            />

                                            {/* Last Name Field */}
                                            <Field
                                                className={
                                                    errors.lastName
                                                        ? `__error`
                                                        : ""
                                                }
                                                placeholder="Last name"
                                                name="lastName"
                                            />
                                        </div>

                                        {/* Email Area */}
                                        <div className="ef_emailForm--field">
                                            <Field
                                                className={
                                                    errors.email
                                                        ? `__error`
                                                        : ""
                                                }
                                                type="email"
                                                placeholder="Email address"
                                                name="email"
                                            />
                                        </div>

                                        {/* Email Area */}
                                        <div className="ef_emailForm--field">
                                            <Field
                                                className={
                                                    errors.email
                                                        ? `__error`
                                                        : ""
                                                }
                                                placeholder="Confirm email address"
                                                name="email1"
                                            />
                                        </div>

                                        {/* Email Error Message */}
                                        <div className="ef_emailForm--field">
                                            <ErrorMessage
                                                name="email"
                                                className="--error"
                                                component="p"
                                            />
                                        </div>

                                        {/* Form Submit */}
                                        <div className="ef_emailForm--field --button">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    );
};

export default EmailForm;
