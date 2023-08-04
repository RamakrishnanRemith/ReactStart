import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const ContactForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/send_email", values)
      .then((res) => {
        alert("Mailsend successfully");
        navigate("/Login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h2 className="text-primary mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <strong>Name</strong>
        </label>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className=" form-control  bg-light"
            placeholder="Name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            name="email"
            className="form-control  text-white"
            placeholder="Email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username">
            <strong>Message</strong>
          </label>
          <textarea
            name="comments"
            className="form-control text-black"
            placeholder="Send your comments"
            onChange={(e) => setValues({ ...values, comments: e.target.value })}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">
          Send
        </button>
      </form>
      <br />
      <Link to="/Login" className="btn btn-success">
        Back
      </Link>
    </div>
  );
};

export default ContactForm;
