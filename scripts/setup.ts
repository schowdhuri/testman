import "reflect-metadata";
import { createConnection } from "typeorm";

import TestCase from "../src/server/models/TestCase";

async function initDB() {
  const conn = await createConnection({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "testman",
    entities: ["src/server/models/*.ts"],
    synchronize: true,
    logging: false
  });
  const testCases = await TestCase.find();
  console.log({ testCases });
  conn.close();
}

console.log("Running setup...");

initDB().then(() => {
  console.log("Done");
});
