const signUp = require("../model");
const code_tbl = require("../model/code");
const { createHmac, randomBytes } = require("crypto")
const { handleOptSender, verifyJwtToken } = require("../service/auth");

async function getAllLogedInUser(req, res) {
    const users = await signUp.find({})
    if (!users) {
        return res.status(404).json({ msg: "No Users!", success: false })
    }
    return res.status(200).json({ msg: "Get All LoggedIn Users!", user: users })
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
                from: process.env.NODE_EMAIL_ADDRESS,
                // TODO: here put sigend user's email id
                // to: "patadiyamanish07@gmail.com",
                to:email,
                subject: "Project Management System Forgot Password",
                html: `<html>
  <head>
    <meta charset="UTF-8" />
    <title>Project Management System</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
      }
      h2 {
        color: #333333;
      }
      p {
        color: #555555;
        line-height: 1.6;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h3>Welcome to Project Management System</h3>
      <p>Hi ${email},</p>
      <p>Signin OTP <h2>${verificationCode}</h2></p>
      <p>Thank you for joining our Project Management System. We’re glad to have you onboard.</p>
      
      <div class="footer">
        &copy; 2025 Project Management System. All rights reserved.
      </div>
    </div>
  </body>
</html>`
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


async function handleVerifyOtp(req, res) {
    const { otp } = req.body;
    console.log("otp::", otp);

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
async function handleverifyEmailAndSendOtp(req, res) {
    const { email } = req.body;
    console.log("handleverifyEmailAndSendOtp ::", req.body);

    // const id=req.user._id
    // console.log("logof forgot userd::",id);

    try {
        if (!email) {
            return res
                .status(404)
                .json({
                    msg: "Please Enter eMail!",
                    success: false
                });
        }
        const user = await signUp.findOne({ email })
        console.log("forgoted user find::", user);

        if (!user) {
            return res
                .status(404)
                .json({
                    msg: "No eMail Found! ",
                    success: false
                });
        }
        const code = Math.floor(Math.random() * 100000).toString()
        const info = handleOptSender.sendMail({
            from: process.env.NODE_EMAIL_ADDRESS,
            // TODO: here put sigend user's email id
            // to: "patadiyamanish07@gmail.com",
            to:email,
            subject: "Project Management System Forgot Password...",
            // html: `<h1>Project Management System Forgot Password OTP :${code}</h1>`
            html: `<html>
  <head>
    <meta charset="UTF-8" />
    <title>Project Management System</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
      }
      h2 {
        color: #333333;
      }
      p {
        color: #555555;
        line-height: 1.6;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h3>Welcome to Project Management System</h3>
      <p>Hi ${email},</p>
      <p>Forgot OTP <h2>${code}</h2></p>
      <p>Thank you for joining our Project Management System. We’re glad to have you onboard.</p>
      
      <div class="footer">
        &copy; 2025 Project Management System. All rights reserved.
      </div>
    </div>
  </body>
</html>`
        })

        await code_tbl.create({
            email: user._id,
            code: code
        })
        // req.session.user_id = user._id;
        return res
            .status(201)
            .json({
                msg: "OTP for Forgot Password Sent Succesfully! ",
                success: true,
                // TODO: remove this code does not sent in return 
                otp: code,
                email: user._id
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                msg: "Something went wrong in Forgot Password",
                success: false,
                error: error
            });
    }
}

async function handleverifyforgototp(req, res) {
    // const {id}=req.user
    // const userId = req.session.user_id
    // at forgot screen pass _id and set from front-end
    const { otp, userId } = req.body;

    // console.log("handleverifyforgototp userd ::", req.session.user_id);
    console.log("handleverifyforgototp userd otp::", otp);
    try {
        // const userId = payload._id;
        console.log("payload2::userId", userId);

        const record = await code_tbl.findOne({ email: userId })
        console.log("payload3::record:: record", record);
        console.log("payload3::record:: otp", otp);

        if (!record) {
            return res.status(404).json({ msg: "No otp found for this mail" })
        }
        console.log("payload4::");
        if (record.code !== otp) {
            return res.status(404).json({ msg: "Invalid OTP!" })
        }
        console.log("payload5::");
        await code_tbl.deleteOne({ email: userId })
        // req.session.destroy();
        console.log("payload6::");

        return res.status(200).json({ msg: "OTP Verified!", success: true })
    } catch (error) {
        return res
            .status(500)
            .json({
                msg: "Something went wrong in handleVerifyOtp",
                success: false,
                user_id: userId
            });
    }
}
async function handlechangepassword(req, res) {
    const { password, user_id } = req.body;
    try {
        if (!user_id || !password) {
            return res.status(404).json({ msg: "Fill All Data!" })

        }
        const salt = randomBytes(16).toString();
        const hashedpwd = createHmac("sha256", salt).update(password).digest("hex")
        const updatedData = {
            password: hashedpwd,
            salt: salt
        }
        const user =await signUp.findByIdAndUpdate({ _id: user_id }, updatedData)
        console.log("updated password::",user);
        
          return res.status(200).json({ msg: "Password Updated!", success: true,id:user._id })
    } catch (error) {
        return res
            .status(500)
            .json({
                msg: "Something went wrong in change forgot pasword",
                success: false
            });
    }
}
module.exports = { handleSignup, handleSignin, handleVerifyOtp, getAllLogedInUser, handleverifyEmailAndSendOtp, handleverifyforgototp, handlechangepassword };
