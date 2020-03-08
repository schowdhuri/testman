import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

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
  @OneToMany(type => TestCase, testCase => testCase.testPlan)
  testCases: TestCase[];
}

export default TestPlan;
