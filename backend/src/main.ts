import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectionOptions, createConnection } from "typeorm";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import recruitRouter from "./routers/recruit.router";
import userRouter from "./routers/user.router";

const app = express();
const swaggerSpec = YAML.load("./src/swagger/build.yaml");
app.use(express.json());
app.use(cors());
app.use("/recruit", recruitRouter);
app.use("/user", userRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
dotenv.config();

const Mysqlconfig: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: process.env.DB_PW,
  database: "myproject",
  synchronize: false,
  logging: true,
  entities: ["src/entities/*.ts"],
};

(async () => {
  await createConnection(Mysqlconfig);
})();

console.log("hello");

app.listen(3000);
