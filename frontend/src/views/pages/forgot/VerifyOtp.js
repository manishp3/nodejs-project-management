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

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log("location FORGOT OTP::", location);

  const verifyforgotOTP = async () => {
    
    const response = await PostApiCall("verifyforgototp/", {
      otp: otp,
      userId: location.state.mailRefId,
    });
    console.log("handleveryfyOtp::", response);
    if (response.success == true) {
      navigate("/forgotpassword",{state:{mailIdRef:location.state.mailRefId}})
      setisOpenChangePasswordModal(true);
      setOtp("");
    }
  };
  const [otp, setOtp] = useState("");

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="shadow-lg rounded-4 border-0">
              <CCardHeader className="bg-primary text-white text-center py-3 rounded-top-4">
                <h4 className="mb-0">Forgot Password</h4>
              </CCardHeader>
              <CCardBody className="p-5">
                <p className="text-center text-muted mb-4">
                  Please enter the OTP sent to your registered email.
                </p>
                <div className="d-flex justify-content-center">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 0.4rem",
                      fontSize: "1.5rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #ced4da",
                      textAlign: "center",
                    }}
                    renderSeparator={<span style={{ width: "8px" }}></span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
              </CCardBody>
              <CCardFooter className='d-flex justify-content-end'>

                <Button variant="primary" onClick={verifyforgotOTP}>
                  Verify OTP
                </Button>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>

  )
}

export default VerifyOtp
