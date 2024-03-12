const { Pool } = require("pg");
require("dotenv").config();

const DbPool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
});

DbPool.on("connect", () => {
  console.log("Connected to the database");
});

DbPool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => DbPool.query(text, params),
};
