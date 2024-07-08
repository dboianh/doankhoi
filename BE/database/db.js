const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456789",
  database: "doankhoi",
  waitForConnections: true,
  connectionLimit: 10,
  port: 3306
});
// const db = mysql.createPool({
//   host: "192.168.1.11",
//   user: "adminict",
//   password: "123456789",
//   database: "doankhoi",
//   waitForConnections: true,
//   connectionLimit: 10,
//   port: 3306
// });

db.getConnection((err, connection) => {
  if (err) throw err
  console.log('Database connected.')
})

// db.connect((err) => {
//   if (err) {
//     console.error("Error: ", err);
//     return;
//   }
//   console.log("Connected to MySQL...");
// });

module.exports = db;
