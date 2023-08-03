import express from "express";
import mysql from "mysql";
import cors from "cors";
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

  const sql = "INSERT INTO usersignup (email, password) VALUES (?)";
  const values = [
    // Extract the value from the array
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
app.listen(8081, () => {
  console.log("Running");
});
