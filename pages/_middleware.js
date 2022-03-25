// const validateEmail = async (email) => {
//     let res = await validate({
//         email: email,
//         // sender: 'name@example.org',
//         validateRegex: true,
//         validateMx: true,
//         validateTypo: true,
//         validateDisposable: true,
//         validateSMTP: true,
//     });
//     console.log("VALIDATOR", res);
// };

export function middleware(req) {
    const url = req.nextUrl.clone();

    // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
    if (url.pathname === "/") {
        // Parse the cookie
        const isInBeta = JSON.parse(req.cookies["beta"] || "false");
        console.log(isInBeta);
        // Rewrite to the correct page
        // url.pathname = `/${isInBeta ? "beta" : "non-beta"}`;

        // return NextResponse.rewrite(url);
    }
}
