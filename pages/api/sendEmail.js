// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async function handler(req, res) {
    const { email, rfi } = req.query;
    let status = 0;
    console.log(email, rfi);

    const msg = {
        to: email, // Change to your recipient
        from: "healal.ahmed180@gmail.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: `Referral ID: ${rfi}`,
        html: `<strong>Referral ID: ${rfi}</strong>`,
    };

    await sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
            status = 200;
        })
        .catch((error) => {
            console.error(error);
            status = 500;
        });

    res.json({ status });
}
