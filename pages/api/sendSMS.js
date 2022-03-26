// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import twilio from "twilio";

const twilioClient = twilio(
    process.env.NEXT_PUBLIC_TWILIO_SID,
    process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
    const { email, rfi } = req.query;
    let status = 0;

    let msg = {
        body: "This is a message that I want to send over WhatsApp with Twilio!",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+15005550006",
    };

    //     twilioClient.messages
    //   .create({
    //      body: 'This is a message that I want to send over WhatsApp with Twilio!',
    //      from: 'whatsapp:+14155238886',
    //      to: 'whatsapp:+15005550006'
    //    })
    //   .then(message => console.log(message.sid));

    // console.log(
    //     process.env.NEXT_PUBLIC_TWILIO_SID,
    //     process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
    // );

    // await sgMail
    //     .send(msg)
    //     .then(() => {
    //         console.log("Email sent");
    //         status = 200;
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         status = 500;
    //     });

    res.json({ ...req.query, ...req.body });
}
