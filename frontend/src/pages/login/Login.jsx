import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import axiosClient from "../../utils/axiosClient";
import { Link } from "react-router-dom";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  function updateFieldData(fieldName, newValue) {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: newValue,
    }));
  }
  async function submitUserDetails(e) {
    e.preventDefault();
    // console.log("user details", userDetails);
    try {
      let res = await axiosClient.post("/users/LoginUser", userDetails);
      console.log(res);
      if (res.status === 200) {
        alert("User Loggedin");
      }
    } catch (error) {
      alert("Invalid credentials", error);
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
          <h1>Login</h1>
          <Form onSubmit={submitUserDetails}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="form-field"
                value={userDetails.email}
                onChange={(e) => {
                  updateFieldData("email", e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                className="form-field"
                value={userDetails.password}
                onChange={(e) => {
                  updateFieldData("password", e.target.value);
                }}
              />
            </Form.Group>
            <p>
              <Link to={"/forgotpassword"} style={{ textDecoration: "none" }}>
                Forgot Password ?
              </Link>
            </p>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <p>
            Don't have an account{" "}
            <Link to={"/"} style={{ textDecoration: "underline" }}>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
