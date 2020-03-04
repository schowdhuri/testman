import "reflect-metadata";
import { createConnection } from "typeorm";
import Item from "../src/server/models/Item";

async function initDB() {
  const conn = await createConnection({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "bucketlist",
    entities: [Item],
    synchronize: true,
    logging: false
  });
  const itemRepo = conn.getRepository(Item);
  const items = await itemRepo.find();
  console.log({ items });
  conn.close();
}

console.log("Running setup...");

initDB().then(() => {
  console.log("Done");
});
