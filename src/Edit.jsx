import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8081/getremith/" + id)
      .then((res) => {
        setData({
          ...data,
          username: res.data.Result[0].username,
          email: res.data.Result[0].email,
          password: res.data.Result[0].password,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/Update/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/Login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Student</h2>
      <form class="row g-3 w-50" onSubmit={handleSubmit}>
        <div class="col-12">
          <label for="inputName" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            value={data.username}
          />
        </div>
        <div class="col-12">
          <label for="inputEmail4" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>
        <div class="col-12">
          <label for="inputEmail4" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="inputEmail4"
            placeholder="Enter password"
            autoComplete="off"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
          />
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
