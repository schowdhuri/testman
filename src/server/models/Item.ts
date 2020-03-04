import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class BLItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  completed: boolean;
}
