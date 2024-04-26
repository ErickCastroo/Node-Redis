import express from "express";
import morgan from "morgan";
import { puerto } from "./config.js";
import { client } from "../db/conection.js";
import { router } from "../routes/index.routes.js";
import responseTime from "response-time";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(responseTime());

app.use(router);

async function main() {
  await client.connect();
  app.listen( puerto);
  console.log(`Server on port ${puerto}`);
}

main();
