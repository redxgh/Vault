const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "superuser147",
  database: "vault_db",
  max: 10,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000,
});
//db_con.on('connect',()=>console.log('database connected'))
//db_con.on('end',()=>console.log('database disconnected'))
module.exports = pool;
