import mssql from "mssql";
import { sqlConfig } from "../config/connection.js";

class DB {
  static async execute(name, data = {}) {
    const pool = await mssql.connect(sqlConfig);
    const request = pool.request();

    for (let key in data) {
      request.input(key, data[key]);
    }
    const result = request.execute(name);
    return result;
  }
}

export default DB;
