import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";

import { setupDatabase } from "./database";

const app = express();

let database: Sequelize;
(async () => {
  if (database) {
    return;
  }
  database = await setupDatabase();
})();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/channels", async (_req, res) => {
  const { models } = database;
  const results = await models.channels.findAll({
    raw: true,
    limit: 10,
    offset: 0,
  });
  res.json(results);
});

app.listen(3000);
console.log("server up on http://localhost:3000");
