import mssql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "Jitu-PC110VYA\\MSSQLSERVER03",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
const dbConnect = async () => {
  try {
    const pool = await mssql.connect(sqlConfig);
    console.log(
      `Connected to ${sqlConfig.database} DB at ${sqlConfig.server} SERVER`
    );
    return pool;
  } catch (error) {
    console.log(error);
  }
};

export { dbConnect, sqlConfig };
