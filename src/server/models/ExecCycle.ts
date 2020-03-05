import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany
} from "typeorm";

import TestRun from "./TestRun";

export enum Status {
  NEW = "New",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed"
}

@Entity()
class ExecCycle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  modified: string;

  @Column()
  name: string;

  @Column({
    type: "date"
  })
  startDate: string;

  @Column({
    type: "date"
  })
  endDate: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.NEW
  })
  status: string;

  @OneToMany(
    type => TestRun,
    testRun => testRun.execCycle
  )
  testRuns: TestRun[];
}

export default ExecCycle;
