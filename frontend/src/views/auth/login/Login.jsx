

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@coreui/react";
import login from "../../../logo/login.jpg";
import "./login.css";
import { FaLock, FaUser } from "react-icons/fa";
import axiosInstance from "axiosInstance";
import ReCAPTCHA from "react-google-recaptcha";
import { NavLink, Link } from 'react-router-dom';

//const SITE_KEY = "6LdXItcqAAAAAIeP1bGdfIXJ-Ue_WKmiKZ0QI5mZ"; 
//const SITE_KEY = "6Le9N_QqAAAAAH0tffoPu6mRegYqwSnVxiQczhNy";
const SITE_KEY = "6Lcu2RwrAAAAAFTuatspqDBOoRs5Ue4CLCgjcpnl"
const sakretKey = "6Lcu2RwrAAAAAOFqJZkFo56LpcNy32-sQUO7iKP2"

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    /* if (!captchaToken) {
       setError("Please complete the reCAPTCHA verification");
       setLoading(false);
       return;
     }
 */
    axiosInstance
      .post("/login", { ...values, captcha: captchaToken }, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        if (res.data.login) {
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("role", res.data.role)
          localStorage.setItem("user", res.data.user)
          localStorage.setItem("email", res.data.email)
          localStorage.setItem("idcustomer", res.data.idcustomer)



          if (res.data.role == "Admin") {

            navigate("/admin/app/dashboard/analytics");
          }
          else {

            navigate("/user/bookingList");
          }
        } else {
          setError(res.data.message || "Login failed");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Login error:", err);

        if (err.response) {
          setError(err.response.data.message || "An error occurred. Please try again.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      });
  };


  return (
    <div className="login-bg min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4 login-card shadow">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <div className="text-center mt-4 animate-fadeIn">
                      <img
                        src={login}
                        alt="Profile"
                        className="animate-scaleUp"
                        width="200" height="200" />
                    </div>
                    <br />
                    <CInputGroup className="mb-3 border-0">
                      <CInputGroupText className="bg-white border-0.1">
                        <FaUser />
                      </CInputGroupText>
                      <CFormInput
                        className="input-focus"
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4 border-0">
                      <CInputGroupText className="bg-white border-1">
                        <FaLock />
                      </CInputGroupText>
                      <CFormInput
                        className="input-focus"
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={values.password}
                      />
                    </CInputGroup>

                    <div className="mb-3 text-center recaptcha-container">
                      <ReCAPTCHA sitekey={SITE_KEY} onChange={(token) => setCaptchaToken(token)} />
                    </div>

                    <CRow className="justify-content-center">
                      <CCol xs={6} className="text-center">
                        <CButton type="submit" className="login-btn" disabled={loading}>
                          {loading ? "Loading..." : "Login"}
                        </CButton>
                        {error && <div className="mt-3 text-danger">{error}</div>}
                      </CCol>
                    </CRow>
                  </CForm>
                  <p className="mb-2 text-muted">
                    Forgot password?{' '}
                    <NavLink to="/auth/reset-password-1" className="f-w-400">
                      Reset
                    </NavLink>
                  </p>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{' '}
                    <NavLink to="/auth/signup-1" className="f-w-400">
                      Signup
                    </NavLink>
                  </p>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;



