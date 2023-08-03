import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/next", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/View");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <div className="text-danger">{error && error}</div>
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <br></br>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password</strong>
            </label>{" "}
            <br></br>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <br></br>
          <button type="submit"> Log in</button>

          <Link to="/Register">Already have an account? Login here.</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
