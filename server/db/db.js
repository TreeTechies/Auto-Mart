import { Pool } from "pg";

const db_name = 'auto_mart_db';
const port = '4532';

const connectionString = `postgresql://dbuser:secretpassword@database.server.com:${port}/${db_name}`;

module.exports = new Pool({
  connectionString: connectionString,
});