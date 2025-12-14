const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const port = 8081;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "welcome to home" });
});

//  Route: Get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/students", (req, res) => {
  const sql = "INSERT INTO  student (name,email)  VALUES (?) ";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, resutl) => {
    if (err) {
      res.status(500).json({ Message: " Eroor inserting into the DB" });
    } else {
      res.json({ Data: resutl, Message: "Successfully inserted !" });
    }
  });
});

// app.get("/students/:id", (req, res) => {
//   const sql = "SELECT * FROM student WHERE id = ?";
//   const id = req.params.id;
//   db.query(sql, [id], (err, result) => {
//     if (err) {
//       res.status(500).json({ Message: "Surver error occured" });
//     } else res.json(result);
//   });
// });

app.get("/students/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ Message: "Server error occured" });
    } else {
      res.json(result);
    }
  });
});

app.put("/students/:id", (req, res) => {
  const sql = "UPDATE student SET name= ?,email= ? where id= ? ";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, resutl) => {
    if (err) {
      res.status(500).json({ Message: " Eroor updating into the DB", err });
    } else {
      res.json({ Data: resutl, Message: "Successfully updated !" });
    }
  });
});

app.delete("/students/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error deleting record", err });
    }

    res.json({ Message: "Record deleted successfully!", result });
  });
});

app.listen(port, () => {
  console.log("server is running on port 8081");
});
