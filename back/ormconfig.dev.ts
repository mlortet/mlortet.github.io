import { DataSource } from "typeorm";
import { Admin } from "./entities/Admin";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [Admin],
  synchronize: true,
  logging: true,
});
