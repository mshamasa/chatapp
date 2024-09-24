import fs from "fs";
import path from "path";

type Env = {
  DB_USER?: string;
  DB_PASSWORD?: string;
  POSTGRES_DB?: string;
};

const PATH = path.resolve(__dirname, "..", "..", ".env");
const file = fs.readFileSync(PATH, "utf8");
const lines = file.split("\n").filter(Boolean);

const env: Env = {};
lines.forEach((line) => {
  const [key, value] = line.split("=");
  env[key] = value;
});

export default env;
