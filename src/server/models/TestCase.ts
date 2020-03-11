import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { ObjectType, ID, Field, InputType } from "type-graphql";

import Comment from "./Comment";
import RichText from "./RichText";
import TestPlan from "./TestPlan";
import User from "./User";

export enum Status {
  NEW = "New",
  PASS = "Pass",
  FAIL = "Fail"
}

@ObjectType()
@Entity()
class TestCase extends BaseEntity {
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
    type: "enum",
    enum: Status,
    default: Status.NEW
  })
  status: string;

  @Field(() => RichText)
  @OneToOne(type => RichText, { cascade: true })
  @JoinColumn()
  description: RichText;

  @Field()
  @ManyToOne(type => User)
  addedBy: User;

  @Field(type => [Comment], {
    defaultValue: []
  })
  @OneToMany(
    type => Comment,
    comment => comment.testCase
  )
  comments: Comment[];

  @Field(() => TestPlan)
  @ManyToOne(
    type => TestPlan,
    testPlan => testPlan.testCases
  )
  testPlan: TestPlan;
}

@InputType()
export class CreateTestCaseInput {
  @Field()
  name: string;

  @Field()
  descriptionText: string;

  // TODO: user should be retrieved from Context
  @Field()
  addedBy: string;
}

export default TestCase;
