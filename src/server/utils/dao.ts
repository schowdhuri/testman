import "reflect-metadata";
import { createConnection, Connection, Entity, ObjectType } from "typeorm";
import Item from "../models/Item";

export default class DAO {
  connect: Promise<Connection>;

  constructor() {
    this.connect = this._connect();
  }

  _connect() {
    return createConnection({
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
  }

  async save<Entity>(entity: Entity): Promise<Entity> {
    const connection = await this.connect;
    return await connection.manager.save(entity);
  }

  async findOne<Entity>(entityClass: ObjectType<Entity>, id: number): Promise<Entity | undefined> {
    const connection = await this.connect;
    return await connection.manager.findOne(entityClass, id);
  }

  async find<Entity>(entityClass: ObjectType<Entity>): Promise<Entity[]> {
    const connection = await this.connect;
    return await connection.manager.find(entityClass);
  }

  async update<Entity>(
    entityClass: ObjectType<Entity>,
    id: number,
    data: Entity
  ): Promise<Entity> {
    const connection = await this.connect;
    const item = await connection.manager.findOne(entityClass, id);
    if (!item) {
      throw new Error(`Entity ID ${id} not found`);
    }
    for (let key in data) {
      item[key] = data[key];
    }
    return await connection.manager.save(item);
  }

  async remove<Entity>(entityClass: ObjectType<Entity>, id: number): Promise<Entity> {
    const connection = await this.connect;
    const item = await connection.manager.findOne(entityClass, id);
    if (!item) {
      throw new Error(`Entity ID ${id} not found`);
    }
    return await connection.manager.remove(item);
  }
}
