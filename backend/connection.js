const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root1234",
  database: "db_fortune",
});

connection.connect((err) => {
  if (err) {
    console.log("error to connecting the database", err);
  } else {
    console.log("Connected the successfully");
  }
});

module.exports = connection.promise();
