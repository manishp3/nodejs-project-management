import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { PostApiCall } from "../../AuthServices/ApiCall";
import { useNavigate } from "react-router-dom";
const OtpScreen = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  console.log("etnerd otp::", otp);

  const handleveryfyOtp = async () => {
    const response = await PostApiCall("verifyotp/", { otp: otp });
    console.log("handleveryfyOtp::", response);
    if (response.success == true) {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <h1>OTP</h1>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
      {/* <button ></button> */}
      <Button variant="primary" onClick={handleveryfyOtp}>Verify OTP</Button>
    </>
  );
};

export default OtpScreen;
