import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
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
import { PostApiCall } from '../../../ApiCall'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Modal } from '@coreui/coreui'

const Forgot = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  console.log("location FORGOT OTP::", location);

  const [forDatasignUp, setforDatasignUp] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const verifyforgotOTP = async () => {
    // const response = await PostApiCall("Forgot/", {
    const response = await PostApiCall("verifyforgototp/", {
      otp: otp,
      userId: location.state.mailIdRef,
    });
    console.log("handleveryfyOtp::", response);
    if (response.success == true) {
      // setisOpenChangePasswordModal(true);
      setOtp("");
    }
  };
  const [otp, setOtp] = useState("");

  const [changePwdFormdata, setchangePwdFormdata] = useState({
    cPassword: "",
    ccPassword: "",
  });
  const handleForgotPassword = async () => {
    const response = await PostApiCall("forgotpassword/", {
      password: changePwdFormdata.cPassword,
      user_id: location.state.mailIdRef,
    });
    console.log("forgot respomse ::", response);

    if (response.success == true) {
      navigate("/login")
      console.log("forgot respomse ::1", response.msg);

      setShowForgot(false);
      // setisOpenChangePasswordModal(false);
      toast.success(response.msg);
    }
  };

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
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="shadow-lg rounded-4 border-0">
              <CCardHeader className="bg-primary text-white text-center py-3 rounded-top-4">
                <h4 className="mb-0">Change Password</h4>
              </CCardHeader>
              <CCardBody className="p-5">
                <p className="text-center text-muted mb-4">
                  Please enter the OTP sent to your registered email.
                </p>
                <div className="d-flex justify-content-center">
                  <CForm>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="cPassword"
                        value={changePwdFormdata.cPassword}
                        onChange={handleChangePasswordonChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="ccPassword"
                        value={changePwdFormdata.ccPassword}
                        onChange={handleChangePasswordonChange}
                      />
                    </CInputGroup>
                  </CForm>
                  {/* <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="cPassword"
                    value={changePwdFormdata.cPassword}
                    onChange={handleChangePasswordonChange}

                  /> */}
                  {/* {signInError.passwordError != "" ? (
                    <p style={{ color: "red" }}>{signInError.passwordError}</p>
                  ) : (
                    ""
                  )} */}


                  {/* <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="ccPassword"
                    value={changePwdFormdata.ccPassword}
                    onChange={handleChangePasswordonChange}

                  /> */}
                  {/* {changePwdFormdataError.ccPasswordError != "" ? (
                    <p style={{ color: "red" }}>
                      {changePwdFormdataError.ccPasswordError}
                    </p>
                  ) : (
                    ""
                  )} */}




                </div>
              </CCardBody>
              <CCardFooter className='d-flex justify-content-end'>
                <Button variant="primary" onClick={handleForgotPassword}>
                  Reset Password
                </Button>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>

  )
}

export default Forgot
