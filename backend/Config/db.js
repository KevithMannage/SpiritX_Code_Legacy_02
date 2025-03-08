import mysql from 'mysql2/promise'; // Use the promise-based API
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your application's needs
  queueLimit: 0,
});

// Test the database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
})();

// Export a function to execute queries
export const execute = async (query, params) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(query, params);
    return rows; // Ensure this returns an array
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};


// Export the pool for advanced use cases (optional)
export default pool;