import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate()
  const [forDatasignUp, setforDatasignUp] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [issignUpDisabled, setissignUpDisabled] = useState(false);
  const [signUpError, setsignUpError] = useState({
    userNameError: 0,
    emailEror: 0,
    passwordError: 0,
  });
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
    // try {
      const data = await PostApiCall("signup/", payload);
      console.log("log signupdate::", data);
      if (data.success == true) {
        navigate("/login");
        toast.success(data.msg);
        setissignUpDisabled(false);
      }
      else{
        toast.error(data.msg);
      }
    // } catch (err) {
    //   console.log("signup erro :", err);
    // } finally {
    //   setissignUpDisabled(false);
    // }
  };
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

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput name="userName" placeholder="Username" autoComplete="username" value={forDatasignUp.userName}
                      onChange={handleSignUpChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" name="email" autoComplete="email" value={forDatasignUp.email}
                      onChange={handleSignUpChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={forDatasignUp.password}
                      onChange={handleSignUpChange}

                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" onClick={handleSignUp}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
