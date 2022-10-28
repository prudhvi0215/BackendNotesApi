const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Zonal_143$",
  database: "Notes",
});

client.on("connect", () => {
  console.log("Database Connected...");
});

module.exports = client;
