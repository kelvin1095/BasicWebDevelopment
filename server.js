const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { Pool } = require("pg");

app.use(express.static(path.join(__dirname)));

// Setup the PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

// Middleware to parse JSON body
app.use(bodyParser.json());

// Handle GET request from the frontend
app.get("/get-data", async (req, res) => {
  try {
    const selectedValue = req.query.selectedValue;

    // Perform a database SELECT query using the selectedValue
    const queryResult = await pool.query("SELECT * FROM pokemon WHERE name = $1", [selectedValue]);

    res.status(200).json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
