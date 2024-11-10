import { DataSource } from "typeorm";
import { Admin } from "./entities/Admin";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite", // Base de données SQLite locale
  entities: [Admin],
  synchronize: true, // Crée les tables automatiquement
  logging: true,
});
