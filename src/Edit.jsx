import React, { useState } from "react";
import axios from "axios";

import Validation from "./Loginvalitation";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check if there are any errors before submitting the form
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Values:", values);
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/Login");
        })
        .catch((error) => {
          // Handle network errors
          if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.log("Server Error:", error.response.data);
          } else if (error.request) {
            // The request was made, but no response was received
            console.log("No response from server");
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error:", error.message);
          }
        });
    }
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            <strong>UserName</strong>
          </label>
          <input
            type="username"
            placeholder="Enter username"
            name="username"
            onChange={handleInput}
          />
          {errors.username && (
            <span className="text-danger">{errors.username}</span>
          )}
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={handleInput}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}

          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handleInput}
          />
          {errors.password && <span>{errors.password}</span>}
          <br></br>
          <button type="submit"> Sign Up</button>
        </form>
        <button className="link-btn">
          <Link to="/Login">Already have an account? Login here.</Link>
        </button>
      </div>
    </div>
  );
}
export default Register;
