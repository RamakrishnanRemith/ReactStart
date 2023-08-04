import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

function View() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getStudent")
      .then((res) => {
        console.log(res.data); // Check the response data here
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then((res) => {
        console.log(res.data); // Check the response data here
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error deleting user.");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Student List</h3>
      </div>
      <Link to="/Register" className="btn btn-success">
        Add Student
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>
                    <Link
                      to={"/Edit/" + student.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <Link
                        to={"/View"}
                        className="btn btn-primary btn-sm me-2"
                      >
                        delete
                      </Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
