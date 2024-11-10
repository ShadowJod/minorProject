const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dictionary",
  });
  
  // con.connect((error) => {
  //   if (error) throw error;
  //   else {
  //     console.log("Connected");
  //   }
  // });

module.exports = con;