import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME ?? "";
const username = process.env.DB_USER ?? "";
const pass = process.env.DB_PASS ?? "";
const host = process.env.DB_HOST ?? "";
const port = Number(process.env.PORT);

const sequelize = new Sequelize({
  dialect: "postgres",
  database: dbName,
  username: username,
  password: pass,
  host: host,
  port: port,
  ssl: false,
});

export default sequelize;
