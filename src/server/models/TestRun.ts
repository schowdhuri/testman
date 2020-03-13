import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne
} from "typeorm";
import { ObjectType, ID, Field, InputType } from "type-graphql";

import ExecCycle from "./ExecCycle";
import TestCase from "./TestCase";
import User from "./User";

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
    type: "date",
    nullable: true
  })
  runDate: string;

  @Field()
  @Column({
    type: "enum",
    enum: Status,
    default: Status.NEW
  })
  status: string;

  @Field()
  @ManyToOne(type => User)
  user: User;

  @Field(() => TestCase)
  @ManyToOne(type => TestCase)
  testCase: TestCase;

  @Field(() => ExecCycle)
  @ManyToOne(
    type => ExecCycle,
    execCycle => execCycle.testRuns
  )
  execCycle: ExecCycle;
}

@InputType()
export class CreateTestRunInput {
  @Field()
  user: string;

  @Field()
  testCase: number;

  @Field()
  execCycle: number;
}

export default TestRun;
