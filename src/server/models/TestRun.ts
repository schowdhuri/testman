import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from "typeorm";

export enum Status {
  NEW = "New",
  PASS = "Pass",
  FAIL = "Fail"
}

@Entity()
class TestRun extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  modified: string;

  @Column({
    type: "date"
  })
  runDate: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.NEW
  })
  status: string;
}

export default TestRun;
