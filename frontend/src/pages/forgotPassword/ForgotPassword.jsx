import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../utils/axiosClient";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const ForgotPassword = () => {
  // useStates
  const [userDetails, setUserDetails] = useState({
    email: "",
    OTP: "",
    newPassword: "",
  });
  const [otpSentStatus, setOtpSentStatus] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  /*-----------------------------------------------*/

  // Update user Details
  function updateFieldData(fieldName, newValue) {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: newValue,
    }));
  }

  // Send OTP
  async function SendOTP(e) {
    try {
      e.preventDefault();
      let res = await axiosClient.post("/users/forgotPassword", {
        email: userDetails.email,
      });
      if (res.status === 200) {
        setOtpSentStatus(true);
      }
    } catch {
      alert("Error sending OTP");
    }
  }

  // Verify OTP
  async function VerifyOTP(e) {
    try {
      e.preventDefault();
      let res = await axiosClient.post("/users/verifyOTP", {
        email: userDetails.email,
        OTP: userDetails.OTP,
      });
      console.log(res);
      setOtpVerified(true);
    } catch {
      alert("Invalid OTP");
    }
  }

  // Update New Password
  async function updateNewPassword(e) {
    try {
      e.preventDefault();
      await axiosClient.post("/users/updatePassword", {
        email: userDetails.email,
        newPassword: userDetails.newPassword,
      });
      console.log("Password Updated");
      alert("Your password is updated");
      navigate("/login");
    } catch {
      alert("Error updating new password");
    }
  }

  return (
    <div className=" signup-page d-flex " style={{ height: "100vh" }}>
      <div
        className="signup-left-half w-50  d-flex align-items-center justify-content-center"
        style={{ width: "100%", maxHeight: "100%" }}
      >
        <img
          src="auth-cover.jpg"
          alt="authentication-cover"
          style={{ overflow: "hidden" }}
        />
      </div>
      <div className="signup-right-half w-50  d-flex align-items-center justify-content-center">
        <div className=" w-75">
          <h1>Forgot Password</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                disabled={otpSentStatus}
                type="email"
                placeholder="Enter email"
                className="form-field"
                value={userDetails.email}
                onChange={(e) => {
                  updateFieldData("email", e.target.value);
                }}
              />
            </Form.Group>
            {otpSentStatus === false ? (
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                onClick={SendOTP}
              >
                Send OTP
              </Button>
            ) : (
              <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    disabled={otpVerified}
                    type="text"
                    placeholder="Enter OTP"
                    className="form-field"
                    value={userDetails.OTP}
                    onChange={(e) => {
                      updateFieldData("OTP", e.target.value);
                    }}
                  />
                </Form.Group>
                {otpVerified === false ? (
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    onClick={VerifyOTP}
                  >
                    Verify OTP
                  </Button>
                ) : (
                  <>
                    <h6 className="mt-4">Enter your New Password</h6>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="password"
                        placeholder="Enter New Password"
                        className="form-field"
                        value={userDetails.newPassword}
                        onChange={(e) => {
                          updateFieldData("newPassword", e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      onClick={updateNewPassword}
                    >
                      Set New Password
                    </Button>
                  </>
                )}
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
