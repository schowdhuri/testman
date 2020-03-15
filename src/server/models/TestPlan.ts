import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";

import TestCase from "./TestCase";

@ObjectType()
@Entity()
class TestPlan extends BaseEntity {
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

  @Field(() => [TestCase])
  @OneToMany(
    type => TestCase,
    testCase => testCase.testPlan
  )
  testCases: TestCase[];
}

@InputType()
export class CreateTestPlanInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateTestPlanInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(type => [Number], {
    defaultValue: []
  })
  testCases: number[];
}

export default TestPlan;
