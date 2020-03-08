import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne
} from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";

import ExecCycle from "./ExecCycle";

export enum Status {
  NEW = "New",
  PASS = "Pass",
  FAIL = "Fail"
}

@ObjectType()
@Entity()
class TestRun extends BaseEntity {
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
  @Column({
    type: "date"
  })
  runDate: string;

  @Field()
  @Column({
    type: "enum",
    enum: Status,
    default: Status.NEW
  })
  status: string;

  @Field(() => ExecCycle)
  @ManyToOne(
    type => ExecCycle,
    execCycle => execCycle.testRuns
  )
  execCycle: ExecCycle
}

export default TestRun;
