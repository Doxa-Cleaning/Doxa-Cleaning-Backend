import "dotenv/config"; // Automatically loads .env variables

import app from "./app.js";
import pool from "./db/pool.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Connects to the Postgres database
    await pool.connect();
    console.log("Connected to doxa_cleaning_llc database!");

    // 2. Starts the express server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Stops everything if the Db connection fails
  }
};

startServer();
