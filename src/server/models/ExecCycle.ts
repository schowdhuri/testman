import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany
} from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";

import TestRun from "./TestRun";

export enum Status {
  NEW = "New",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed"
}

@ObjectType()
@Entity()
class ExecCycle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created: string;

  @Field()
  @UpdateDateColumn()
  modified: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    type: "date"
  })
  startDate: string;

  @Field()
  @Column({
    type: "date"
  })
  endDate: string;

  @Field()
  @Column({
    type: "enum",
    enum: Status,
    default: Status.NEW
  })
  status: string;

  @Field(() => [TestRun])
  @OneToMany(
    type => TestRun,
    testRun => testRun.execCycle
  )
  testRuns: TestRun[];
}

export default ExecCycle;
