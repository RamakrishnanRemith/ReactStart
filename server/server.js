import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
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

  const sql =
    "INSERT INTO usersignup (username, email, password) VALUES (?, ?, ?)";
  const values = [
    req.body.username[0],
    req.body.email[0],
    req.body.password[0],
  ];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.json({
        Status: "Error",
        Error: "Error inserting data into the database",
      });
    }

    console.log("Data inserted successfully!");
    return res.json({ Status: "Success" });
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
app.get("/getremith/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM usersignup where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;

  // Hash the new password before updating it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in hashing password" });

    const sql =
      "UPDATE usersignup SET username = ?, email = ?, password = ? WHERE id = ?";
    const values = [username, email, hashedPassword, id];

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.json({
          Status: "Error",
          Error: "Error updating data in the database",
        });
      }

      console.log("Data updated successfully!");
      return res.json({ Status: "Success" });
    });
  });
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM usersignup WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.json({
        Status: "Error",
        Error: "Error deleting data from the database",
      });
    }

    console.log("Data deleted successfully!");
    return res.json({ Status: "Success", Result: result });
  });
});

app.listen(8081, () => {
  console.log("Running");
});
