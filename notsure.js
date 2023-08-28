const express = require("express");
const { Pool } = require("pg");

const app = express();

// Set up database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

async function testPostgres() {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Perform a test query
    const result = await client.query("SELECT DISTINCT name FROM pokemon;");

    console.log("Connected to PostgreSQL successfully!");
    console.log("Current time from database:", result.rows);

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
