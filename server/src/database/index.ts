import { Sequelize } from "sequelize";

import env from "../env";

import setupModels from "./models";

const postgresSeqDB = new Sequelize(
  env.POSTGRES_DB,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: (query, timing) => console.info({ query, timing }),
    benchmark: true,
  }
);

const setupDatabase = async () => {
  setupModels(postgresSeqDB);
  return postgresSeqDB;
};

export { setupDatabase };
export default {};
