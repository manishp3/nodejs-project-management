import React, { useEffect, useState } from "react";

import { GetApiCall, PostApiCall } from "../../../ApiCall";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'


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
        // setShowForgot(true);
        navigate("/veirfyOtp",{state:{mailRefId:response.email}})
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
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="Email" name="email" value={forDatasignin.email} onChange={handleSignInChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={forDatasignin.password}
                        onChange={handleSignInChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" disabled={issignInDisabled}
                          onClick={handleSignIn}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0"
                         onClick={handleForgot}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
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
      </CContainer>
    </div>
  )
}

export default Login
