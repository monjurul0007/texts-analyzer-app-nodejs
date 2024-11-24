import { Sequelize } from "sequelize-typescript";
import { Texts } from "./models/Texts";

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_USER,
  dialect: "postgres",
  models: [Texts],
});

export default sequelize;
