import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./registration.css";
import axiosClient from "../../utils/axiosClient";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
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
    let res = await axiosClient.post("/users/registerUser", userDetails);
    console.log(res);

    alert("User SignedIn");
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
          <h1>Sign Up</h1>
          <Form onSubmit={submitUserDetails}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                className="form-field"
                value={userDetails.name}
                onChange={(e) => {
                  updateFieldData("name", e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="form-field"
                value={userDetails.email}
                onChange={(e) => {
                  updateFieldData("email", e.target.value);
                }}
                required
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
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Signup
            </Button>
          </Form>
          <p>
            Already have an account{" "}
            <Link to={"/login"} style={{ textDecoration: "underline" }}>
              Signin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
