# SendEmail

## Getting Started

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
NEXT_PUBLIC_EV_REGEX        = true (Optional || Defaut)
NEXT_PUBLIC_EV_MX           = true (Optional || Defaut)
NEXT_PUBLIC_EV_TYPO         = true (Optional || Defaut)
NEXT_PUBLIC_EV_DISPOSABLE   = true (Optional || Defaut)
NEXT_PUBLIC_EV_SMTP         = false (Optional || Defaut)
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deploy on Vercel
