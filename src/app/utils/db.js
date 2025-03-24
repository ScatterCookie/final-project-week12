import pg from "pg";
export const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});
