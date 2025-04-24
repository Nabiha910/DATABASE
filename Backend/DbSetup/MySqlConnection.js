// db.js
const mysql = require('mysql2');

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: 'localhost',      // The host where your MySQL server is running (often 'localhost')
  user: 'root',  // Replace with your MySQL username
  password: '',  // Replace with your MySQL password
  database: 'perfume_inventory',   // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,    // Number of connections in the pool
  queueLimit: 0
});

module.exports = pool.promise();  // Return promise-based query methods
