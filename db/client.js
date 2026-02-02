const { Client } = require("pg");

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/doxa_cleaning_llc";

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

module.exports = client;
