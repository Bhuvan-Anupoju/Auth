import React from "react";
import Signup from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default App;
