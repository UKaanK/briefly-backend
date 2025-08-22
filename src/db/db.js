const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../../.env" });
const { Pool } = require("pg");


const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL bağlantısı başarılı!"))
  .catch(err => console.error("❌ Bağlantı Hatası:", err));
