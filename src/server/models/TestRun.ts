import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  ManyToMany
} from "typeorm";
import { ObjectType, ID, Field, InputType } from "type-graphql";

import Defect from "./Defect";
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

  @Field(type => TestCase)
  @ManyToOne(
    type => TestCase,
    testCase => testCase.testRuns
  )
  testCase: TestCase;

  @Field(type => [Defect], {
    defaultValue: []
  })
  @ManyToMany(
    type => Defect,
    defect => defect.testRuns
  )
  defects: Defect[];

  @Field(type => ExecCycle)
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

@InputType()
export class UpdateTestRunInput {
  @Field()
  id: number;

  @Field()
  user: string;

  @Field()
  testCase: number;

  @Field()
  execCycle: number;
}

export default TestRun;
