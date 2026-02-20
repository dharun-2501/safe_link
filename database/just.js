import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";


dotenv.config()



const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

console.log(process.env.DATABASE_URL);

pool.connect()
  .then(() => console.log("Connected to Postgres ✅"))
  .catch(err => console.error("Connection error:", err));
