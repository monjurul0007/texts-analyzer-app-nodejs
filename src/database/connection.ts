import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_USER,
  dialect: "postgres",
  models: [__dirname + "models"],
});

export default sequelize;
