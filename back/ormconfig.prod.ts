import { DataSource } from "typeorm";
import { Admin } from "./entities/Admin";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Admin],
  synchronize: false, // use migrations in prod
  logging: false,
});
