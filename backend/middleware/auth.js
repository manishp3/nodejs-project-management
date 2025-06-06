const { verifyJwtToken } = require("../service/auth")

const validateAuthToken = (cookiename) => {
    console.log("cookie name", cookiename);

    return (req, res, next) => {

        // console.log("validateAuthToken::", req.cookies[cookiename]);

        console.log("tokenValue::1", req.cookies);
        const tokenValue = req.cookies[cookiename]
        console.log("tokenValue::2", tokenValue);

        if (!tokenValue) {
            return res.status(401).json({ msg: "unauthorized :No Token", success: false })
        }

        try {
            const userpayload = verifyJwtToken(tokenValue);
            req.user = userpayload;
            return next();
        } catch (error) {
            return res.status(401).json({ msg: "unauthorized : Invalid Token", success: false });
        }
    }

}

module.exports = {
    validateAuthToken
}