const signUp = require("../model");
const code_tbl = require("../model/code");
const { handleOptSender, verifyJwtToken } = require("../service/auth");

async function getAllLogedInUser(req,res) {
    const users=await signUp.find({})
    if(!users){
        return res.status(404).json({msg:"No Users!",success:false})
    }
    return res.status(200).json({msg:"Get All LoggedIn Users!",user:users})
}
async function handleSignup(req, res) {
    try {
        const { email, password } = req.body;
        console.log("log of signup body::", req.body);
        const data = await signUp.create({
            email: email,
            password: password,
        });
        console.log("data saved::", data);


        return res
            .status(200)
            .json({ msg: "SignUp success", success: true });
    } catch (error) {
        return res.status(401).json({ msg: "Error in SignUp", success: false, err: error });
    }
}

async function handleSignin(req, res) {
    console.log("handleSignin:", req.body);

    //  DONE: add jwt token ,add nodemailer on login time
    try {

        const { email, password } = req.body;
        const token = await signUp.matchPassword(email, password)
        console.log("log og token handlsignin::", token);
        const user = await signUp.findOne({ email })
        if (token) {
            const verificationCode = Math.floor(Math.random() * 100000).toString()
            const info = await handleOptSender.sendMail({
                from: process.env.NODE_EMAIL_ADDRESS
                ,
                // TODO: static added mail
                to: "patadiyamanish07@gmail.com",
                subject: "Jeera Verification Code",
                html: `<h1> Code : ${verificationCode}</h1>`
            })
            console.log("info", info);
            await code_tbl.create({
                email: user._id,
                code: verificationCode
            })
            return res.cookie("token", token).status(200).json({ msg: "Signin success", success: true, token: token })
        }

        return res.status(401).json({ msg: "Unautheticated", success: false })
    } catch (error) {
        console.error("Error in handleSignin:", error);
        return res.status(500).json({ msg: "Internal Server Error singin", success: false });
    }
}

// TODO: here error 
async function handleVerifyOtp(req, res) {
    const { otp } = req.body;
    console.log("otp::",otp);
    
    try {
        const token = req.cookies.token
        console.log("handleVerifyOtp req.body::", req.body);
        console.log("req.cookie::", req.cookies.token);
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized" })
        }

        const payload = await verifyJwtToken(token);
        console.log("payload1::email", payload);


        const userId = payload._id;
        console.log("payload2::userId", userId);

        const record = await code_tbl.findOne({ email: userId })
        console.log("payload3::record", record);

        if (!record) {
            return res.status(404).json({ msg: "No otp found for this mail" })
        }
        console.log("payload4::");
        if (record.code !== otp) {
            return res.status(400).json({ msg: "Invalid OTP!" })
        }
        console.log("payload5::");
        await code_tbl.deleteOne({ email: userId })
        console.log("payload6::");

        return res.status(200).json({ msg: "OTP Verified!", success: true })

    } catch (error) {
        return res
            .status(500)
            .json({
                msg: "Something went wrong in handleVerifyOtp",
                success: false
            });
    }

}
module.exports = { handleSignup, handleSignin, handleVerifyOtp, getAllLogedInUser };
