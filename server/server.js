import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signupnew",
});

app.post("/signup", (req, res) => {
  console.log("Received data from frontend:", req.body);

  const sql = "INSERT INTO usersignup (username,email, password) VALUES (?)";
  const values = [
    // Extract the value from the array
    req.body.username[0],
    req.body.email[0], // Extract the value from the array
    req.body.password[0], // Extract the value from the array
  ];
  con.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json("Error occurred while inserting data.");
    }
    return res.json(data);
  });
});

app.post("/next", (req, res) => {
  const sql = "SELECT * FROM usersignup Where email = ? AND  password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in runnig query" });
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});
app.get("/getStudent", (req, res) => {
  const sql = "SELECT * FROM usersignup";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.listen(8081, () => {
  console.log("Running");
});
