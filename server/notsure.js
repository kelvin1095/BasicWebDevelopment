const express = require("express");
const { Pool } = require("pg");

const app = express();

// Set up database connection
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "password",
//   port: 5432,
// });

console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_PORT);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testPostgres() {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Perform a test query
    const result = await client.query("SELECT * FROM pokemon where name = 'Bulbasaur';");

    console.log("Connected to PostgreSQL successfully!", result.rows);

    // Release the client
    client.release();
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  } finally {
    // Close the connection pool
    pool.end();
  }
}

// Run the test function
testPostgres();
