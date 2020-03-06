import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

export default class DB {
  _connect: Promise<Connection>;
  constructor() {
    this._connect = createConnection({
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
  }
  connect() {
    return this._connect;
  }
}
