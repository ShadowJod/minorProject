const express = require("express");
const app = express();
const con = require("./connection");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.redirect(__dirname + "/index.html");
});

// app.get("/data", (req, res) => {
//   con.query("Select * from entries", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("read.ejs", { data });
//     }
//   });
// });

app.get("/fetch-data", (req, res) => {
  const { input } = req.query;

  // Define your SQL query, using a placeholder for the input
  const query = "SELECT * FROM entries WHERE word = ?";

  con.query(query, [input], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      // Send error response as JSON
      return res.status(500).json({ error: "Error fetching data" });
    }
    // Send results as JSON
    res.json(results);
  });
});

app.post("/create", (req, res) => {
  const word = req.body.word;
  const definition= req.body.definition;
 
  try {
    const sql = "Insert into entries (word, definition) values(?,?)";
    con.query(sql, [word, definition], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Word added successfully");
      }
    });
    // res.status(500).send("Your form is sumbitted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(5000, (error) => {
  if (error) throw error;
  else {
    console.log("Server running on 5000");
  }
});
