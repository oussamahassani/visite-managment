import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from 'react-router-dom';
import axiosInstance from "axiosInstance"
// react-bootstrap
import { Card, Row, Col } from 'react-bootstrap';
import {

  CForm,

} from "@coreui/react";
// project import
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

// assets
import logoDark from '../../../assets/images/logo-dark.png';

// ==============================|| SIGN UP 1 ||============================== //

const SignUp1 = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    console.log("sumbit")
    console.log(values)
    event.preventDefault();
    setLoading(true);
    setError("");

    if (values.email && values.password) {
      console.log("sumbit2")

      axiosInstance
        .post("/register", { ...values, role: "user", captcha: captchaToken }, { withCredentials: true })
        .then((res) => {
          setLoading(false);
          if (res.data) {

            navigate("/auth/login");
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
    }
  };
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content text-center">
          <Card className="borderless">
            <Row className="align-items-center text-center">
              <Col>
                <CForm onSubmit={handleSubmit}>
                  <Card.Body className="card-body">
                    <img src={logoDark} alt="" className="img-fluid mb-4" />
                    <h4 className="mb-3 f-w-400">Sign up</h4>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Username" name="username" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="contact" name="contact" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="address" name="address" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <input type="email" className="form-control" placeholder="Email address" name="email" onChange={handleChange}
                        value={values.email} />
                    </div>
                    <div className="input-group mb-4">
                      <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange}
                        value={values.password} />
                    </div>
                    <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked={false} />
                      <label className="custom-control-label mx-2" htmlFor="customCheck1">
                        Send me the <Link to="#"> Newsletter</Link> weekly.
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4" disabled={loading}>Sign up</button>

                  </Card.Body>
                </CForm>
                <p className="mb-2">
                  Already have an account?{' '}
                  <NavLink to="/auth/login" className="f-w-400">
                    Signin
                  </NavLink>
                </p>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
