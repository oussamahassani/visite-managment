import React,{ useState  } from 'react';
import { NavLink } from 'react-router-dom';

// react-bootstrap
import { Card, Row, Col } from 'react-bootstrap';

// project import
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

// assets
import logoDark from '../../../assets/images/logo-dark.png';
import axiosInstance from "axiosInstance";
import {

  CForm,

} from "@coreui/react";
import { useNavigate } from "react-router-dom";

// ==============================|| RESET PASSWORD 1 ||============================== //

const ResetPassword1 = () => {
    const [values, setValues] = useState({ email: ""});
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
        const navigate = useNavigate();
      
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
      setError("");
  
    
      axiosInstance
        .post("/fogetpass", { ...values }, { withCredentials: true })
        .then((res) => {
          setLoading(false);
          if (res.data.status) {
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
    };
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content text-center">
          <Card className="borderless">
            <Row className="align-items-center text-center">
              <Col>
                <Card.Body className="card-body">
                      <CForm onSubmit={handleSubmit}>
                  <h4 className="mb-3 f-w-400">Reset your password</h4>
                  <div className="input-group mb-4">
                    <input type="email" className="form-control" placeholder="Email address"   name="email"
  onChange={handleChange}                         value={values.email}
/>
                  </div>
                  <button className="btn btn-block btn-primary mb-4">Reset password</button>
                   </CForm>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{' '}
                    <NavLink to="/auth/signup-1" className="f-w-400">
                      Signup
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          {error && <div className="mt-3 text-danger">{error}</div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword1;
