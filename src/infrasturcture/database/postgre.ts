import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { User } from "@/models/user";
import { Category } from "@/models/category";
import { Blog } from "@/models/blog";

console.log(process.env.DB_NAME);
const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  ssl: true,
  clientMinMessages: "notice",
  models: [User, Category, Blog],
});

export default sequelize;
