import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import { GetApiCall, PostApiCall } from "../../AuthServices/ApiCall";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [showForgot, setShowForgot] = useState(false);
  const [issignInDisabled, setissignInDisabled] = useState(false);
  const [issignUpDisabled, setissignUpDisabled] = useState(false);
  const [signInError, setsignInError] = useState({
    emailEror: 0,
    passwordError: 0,
  });
  const [signUpError, setsignUpError] = useState({
    userNameError: 0,
    emailEror: 0,
    passwordError: 0,
  });
  console.log("signInError::", signInError);

  const [forDatasignUp, setforDatasignUp] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [forDatasignin, setforDatasignIn] = useState({
    email: "",
    password: "",
  });
  const handleSignUpChange = (e) => {
    console.log("handleSignUpChange e::", e.target);

    const { name, value } = e.target;
    setforDatasignUp((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name == "userName") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          userNameError: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          userNameError: 0,
        }));
      }
    }
    if (name == "email") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: 0,
        }));
      }
    }
    if (name == "password") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          passwordError: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          passwordError: 0,
        }));
      }
    }
  };
  const handleSignUpBlur = (e) => {
    const { name, value, validity } = e.target;
    if (name == "userName") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          userNameError: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          userNameError: 0,
        }));
      }
    }
    if (name == "email") {
      // if(){

      // }
      if (validity.valid == 0 || !value) {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: 0,
        }));
      }
    }
    if (name == "password") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          passwordError: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          passwordError: 0,
        }));
      }
    }
  };
  const handleSignUp = async () => {
    let valid = true;
    if (forDatasignUp.userName == "") {
      setsignUpError((prev) => ({
        ...prev,
        userNameError: 1,
      }));
      valid = false;
    }
    if (forDatasignUp.email == "") {
      setsignUpError((prev) => ({
        ...prev,
        emailEror: 1,
      }));
      valid = false;
    }
    if (forDatasignUp.password == "") {
      setsignUpError((prev) => ({
        ...prev,
        passwordError: 1,
      }));
      valid = false;
    }
    if (!valid) return 0;
    setissignUpDisabled(true);
    const payload = {
      username: forDatasignUp.userName,
      email: forDatasignUp.email,
      password: forDatasignUp.password,
    };
    try {
      const data = await PostApiCall("signup/", payload);
      console.log("log signupdate::", data);
      if (data.success == true) {
        toast.success("success signup");
        setissignUpDisabled(false);
      }
    } catch (err) {
      console.log("signup erro :", err);
    } finally {
      setissignUpDisabled(false);
    }
  };

  const handleSignInChange = (e) => {
    console.log("handleSignInChange e::", e.target);

    const { name, value } = e.target;
    setforDatasignIn((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name == "email") {
      if (!value) {
        setsignInError((prev) => ({
          ...prev,
          emailEror: 1,
        }));
      } else {
        setsignInError((prev) => ({
          ...prev,
          emailEror: 0,
        }));
      }
    }
    if (name == "password") {
      if (!value) {
        setsignInError((prev) => ({
          ...prev,
          passwordError: 1,
        }));
      } else {
        setsignInError((prev) => ({
          ...prev,
          passwordError: 0,
        }));
      }
    }
  };
  const handleSignInonBlur = (e) => {
    const { name, value, validity } = e.target;
    console.log("handleSignInonBlur::", e.target);
    console.log("handleSignInonBlur::", name, value);
    if (name == "email") {
      if (validity.valid == 0 || !value) {
        setsignInError((prev) => ({
          ...prev,
          emailEror: 1,
        }));
      } else {
        setsignInError((prev) => ({
          ...prev,
          emailEror: 0,
        }));
      }
    }
    if (name == "password") {
      if (!value) {
        setsignInError((prev) => ({
          ...prev,
          passwordError: 1,
        }));
      } else {
        setsignInError((prev) => ({
          ...prev,
          passwordError: 0,
        }));
      }
    }
  };

  const [signInOtpMOdal, setsignInOtpMOdal] = useState(false);
  const handleSignIn = async () => {
    console.log("called on sigin");
    
    let valid = true;
    if (forDatasignin.email == "") {
      setsignInError((prev) => ({
        ...prev,
        emailEror: 1,
      }));
      valid = false;
    }
    if (forDatasignin.password == "") {
      setsignInError((prev) => ({
        ...prev,
        passwordError: 1,
      }));
      valid = false;
    }
    if (!valid) return 0;
    setissignInDisabled(true);
    const payload = {
      email: forDatasignin.email,
      password: forDatasignin.password,
    };

    try {
      const data = await PostApiCall("signin/", payload);
      console.log("log success sigin::", data);
      toast.success(data.msg)
      if (data.success == true) {
        setOtp("");
        setissignInDisabled(false);
        setsignInOtpMOdal(true);
      }
    } catch (err) {
      console.log("Error singin::", err);
    } finally {
      setissignInDisabled(false);
    }
  };
  console.log("forDatasignin email check::", forDatasignin);
  const [forgotUserMailIRef, setforgotUserMailIRef] = useState(0);
  const handleForgot = async () => {
    console.log("forDatasignin::", forDatasignin);

    if (forDatasignin.email == "") {
      setsignInError((pre) => ({
        ...pre,
        emailEror: 1,
      }));
      // return 0;
    } else {
      try {
        const response = await PostApiCall("sendforgototp/", {
          email: forDatasignin.email,
        });
        setforgotUserMailIRef(response.email);
        setShowForgot(true);
        console.log("log of resposen senfotp::", response);
      } catch (error) {
        console.log("log of resposen error::", error);
      } finally {
        setOtp("");
      }
    }
  };

  const [otp, setOtp] = useState("");
  const [isOpenChangePasswordModal, setisOpenChangePasswordModal] =
    useState(false);

  console.log("etnerd otp::", otp);

  const verifyforgotOTP = async () => {
    // const response = await PostApiCall("verifyotp/", {
    const response = await PostApiCall("verifyforgototp/", {
      otp: otp,
      userId: forgotUserMailIRef,
    });
    console.log("handleveryfyOtp::", response);
    if (response.success == true) {
      setisOpenChangePasswordModal(true);
      setOtp("");
    }
  };
  const verifySignInOtp = async () => {
    // const response = await PostApiCall("verifyotp/", {
    const response = await PostApiCall("verifyotp/", {
      otp: otp,
    });
    console.log("handleveryfyOtp::", response);
    if (response.success == true) {
      setOtp("");
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    }
  };
  const [changePwdFormdata, setchangePwdFormdata] = useState({
    cPassword: "",
    ccPassword: "",
  });
  const [changePwdFormdataError, setchangePwdFormdataError] = useState({
    cPasswordError: "",
    ccPasswordError: "",
  });

  const handleChangePasswordonChange = (e) => {
    const { name, value } = e.target;
    setchangePwdFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name == "cPassword") {
      if (!value) {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          cPasswordError: "Please Enter Password",
        }));
      } else {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          cPasswordError: "",
        }));
      }
    }
    if (name == "ccPassword") {
      if (!value) {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          ccPasswordError: "Please Enter Confirm Password",
        }));
      } else {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          ccPasswordError: "",
        }));
      }
    }
  };
  const handleChangePasswordonBlur = (e) => {
    const { name, value } = e.target;
    if (name == "cPassword") {
      if (!value) {
        setchangePwdFormdataError((prev) => ({
          ...prev,
          cPasswordError: "Please Enter Passowrd",
        }));
      }
    }
    if (name == "ccPassword") {
      if (!value) {
        setchangePwdFormdataError((prev) => ({
          ...prev,
          ccPasswordError: "Please Enter Confirm Passowrd",
        }));
      } else if (changePwdFormdata.cPassword != changePwdFormdata.ccPassword) {
        setchangePwdFormdataError((prev) => ({
          ...prev,
          ccPasswordError: "Confirm Passowrd must be same.",
        }));
      } else {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          ccPasswordError: "",
        }));
      }
    }
  };
  const handleForgotPassword = async () => {
    const response = await PostApiCall("forgotpassword/", {
      password: changePwdFormdata.cPassword,
      user_id: forgotUserMailIRef,
    });
    console.log("forgot respomse ::", response);

    if (response.success == true) {
      console.log("forgot respomse ::1", response.msg);

      setShowForgot(false);
      setisOpenChangePasswordModal(false);
      toast.success(response.msg);
    }
  };

  return (
    <div  style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // optional background
  }}>
    <div
      className="card p-4 shadow"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <Nav variant="tabs" defaultActiveKey="signin" className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="signin" onClick={() => setTab("signin")}>
            Sign In
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="signup" onClick={() => setTab("signup")}>
            Sign Up
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {tab === "signin" && (
        <Form>
          <Form.Group className="mb-3" controlId="signinEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={forDatasignin.email}
              onChange={handleSignInChange}
              onBlur={handleSignInonBlur}
              placeholder="Enter email"
              isInvalid={signInError.emailEror == 1}
            />
            {signInError.emailEror == 1 ? (
              <p style={{ color: "red" }}>Please Enter Valid Email</p>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="signinPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={forDatasignin.password}
              onChange={handleSignInChange}
              onBlur={handleSignInonBlur}
              isInvalid={signInError.passwordError == 1}
            />
            {signInError.passwordError == 1 ? (
              <p style={{ color: "red" }}>Please Enter Passowrd</p>
            ) : (
              ""
            )}
          </Form.Group>

          <div className="d-flex justify-content-between mb-3">
            {/* <Form.Check type="checkbox" label="Remember me" /> */}
            <Button
              className="float-right"
              variant="link"
              size="sm"
              onClick={handleForgot}
            >
              Forgot Password?
            </Button>
          </div>

          <Button
            variant="primary"
            className="w-100"
            disabled={issignInDisabled}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Form>
      )}

      {tab === "signup" && (
        <Form>
          <Form.Group className="mb-3" controlId="signupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={forDatasignUp.userName}
              onChange={handleSignUpChange}
              onBlur={handleSignUpBlur}
              isInvalid={signUpError.userNameError == 1}
              placeholder="Full Name"
            />
            {signUpError.userNameError == 1 ? (
              <p style={{ color: "red" }}>Please Enter Username</p>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={forDatasignUp.email}
              onChange={handleSignUpChange}
              onBlur={handleSignUpBlur}
              isInvalid={signUpError.emailEror == 1}
            />
            {signUpError.emailEror == 1 ? (
              <p style={{ color: "red" }}>Please Enter Valid E-mail</p>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Create Password"
              name="password"
              value={forDatasignUp.password}
              onChange={handleSignUpChange}
              onBlur={handleSignUpBlur}
              isInvalid={signUpError.passwordError == 1}
            />
            {signUpError.passwordError == 1 ? (
              <p style={{ color: "red" }}>Please Enter Password</p>
            ) : (
              ""
            )}
          </Form.Group>

          <Button
            variant="success"
            className="w-100"
            disabled={issignUpDisabled}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Form>
      )}
      {/* signin otp modal */}
      <Modal show={signInOtpMOdal} onHide={() => setsignInOtpMOdal(false)}>
        {/* <Modal show={signInOtpMOdal}> */}
        <Modal.Header closeButton>
          <Modal.Title>SignIn OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              // isDisabled={true}
              renderSeparator={<span style={{ visibility: "hidden" }}>--</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setsignInOtpMOdal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={verifySignInOtp}>
            Verify OTP
          </Button>
        </Modal.Footer>
      </Modal>
      {/* forgot modal */}
      <Modal show={showForgot} onHide={() => setShowForgot(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form>
              <Form.Label>Enter your email</Form.Label>
              <Form.Control type="email" placeholder="Email address" />
              </Form.Group> */}
          {/* <Form.Group controlId="forgotEmail"> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              renderSeparator={<span style={{ visibility: "hidden" }}>--</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForgot(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={verifyforgotOTP}>
            Verify OTP
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isOpenChangePasswordModal}
        // onHide={() => setisOpenChangePasswordModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="signinPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="cPassword"
              value={changePwdFormdata.cPassword}
              onChange={handleChangePasswordonChange}
              onBlur={handleChangePasswordonBlur}
              isInvalid={changePwdFormdataError.cPasswordError != ""}
            />
            {signInError.passwordError != "" ? (
              <p style={{ color: "red" }}>{signInError.passwordError}</p>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="signinPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="ccPassword"
              value={changePwdFormdata.ccPassword}
              onChange={handleChangePasswordonChange}
              onBlur={handleChangePasswordonBlur}
              isInvalid={changePwdFormdataError.ccPasswordError != ""}
            />
            {changePwdFormdataError.ccPasswordError != "" ? (
              <p style={{ color: "red" }}>
                {changePwdFormdataError.ccPasswordError}
              </p>
            ) : (
              ""
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            variant="secondary"
            onClick={() => setisOpenChangePasswordModal(false)}
          >
            Close
          </Button> */}
          <Button variant="primary" onClick={handleForgotPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default Login;
