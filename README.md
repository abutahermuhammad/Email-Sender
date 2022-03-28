# SendEmail

[LIVE](https://email-sender-ten.vercel.app/)

## Getting Started

To run this project, open your terminal on this project directory and then run below command.

```bash
npm install
# or
yarn install
```

Create an `.env` file and configure accordingly.

```bash
NEXT_PUBLIC_API_URL     = http://domain-name.com/api

# Send Grid
NEXT_PUBLIC_SG_SENDER           = example@mail.com
NEXT_PUBLIC_SG_EMIAIL_SUBJECT   = Your email subject (Optional)
NEXT_PUBLIC_SENDGRID_API_KEY    = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Email Validator
# This configuration controls the email validator function.
# You can easily enable/Disable any feature or even stop validation by giving falsy value to every option
NEXT_PUBLIC_EV_REGEX        = true (Optional)
NEXT_PUBLIC_EV_MX           = true (Optional)
NEXT_PUBLIC_EV_TYPO         = true (Optional)
NEXT_PUBLIC_EV_DISPOSABLE   = true (Optional)
NEXT_PUBLIC_EV_SMTP         = false (Optional)
```

Wow! we are about to check check our nice and beautiful project.
Finally, run the server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
