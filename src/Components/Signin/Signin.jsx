import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserStatusContext } from "../../Scripts/AppContainer";
import "./Signin.css";
import apiCaller from "../../Scripts/ApiCaller";
import User from "../../Scripts/User";

const Signin = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useContext(UserStatusContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage(""); // Clear error message when switching forms
  };

  const handlePasswordToggle = () => setShowPassword(!showPassword);

  const signInValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const signUpValidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values) => {
    isSignIn ? handleSignIn(values) : handleSignUp(values);
  };

  const handleSignIn = async (values) => {
    try {
      const body = {
        email: values.email,
        password: values.password,
      };

      const response = await apiCaller(
        "post",
        "/account/login",
        body,
        {},
        {},
        false
      );
      if (response.message === "success") {
        setIsLoggedIn(true);
        localStorage.setItem("access-token", response.results.accessToken);
        User.setUserName(response.results.customerName);
        navigate("/");
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const handleSignUp = async (values) => {
    try {
      const body = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const response = await apiCaller("post", "/account/signup", body);
      if (response.message === "success") {
        setIsLoggedIn(true);
        localStorage.setItem("access-token", response.results.accessToken);
        User.setUserName(response.results.customerName);
        navigate("/");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin">
        <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={
            isSignIn ? signInValidationSchema : signUpValidationSchema
          }
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              {!isSignIn && (
                <div>
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
              )}
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              {!isSignIn && (
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>
              )}
              <div className="toggle-password">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={handlePasswordToggle}
                />
                <h4>Show Password</h4>
              </div>
              <button type="submit" className="signinbutton">
                {isSignIn ? "Sign In" : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <p>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={toggleForm} className="toggle-button">
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signin;
