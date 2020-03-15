import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";

import RichText from "./RichText";
import User from "./User";
import TestRun from "./TestRun";
import Comment from "./Comment";

export enum Status {
  OPEN = "Open",
  WIP = "WIP",
  RESOLVED = "Resolved",
  NON_ISSUE = "Non Issue"
}

@ObjectType()
@Entity()
class Defect extends BaseEntity {
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
    default: Status.OPEN
  })
  status: string;

  @Field(() => RichText)
  @OneToOne(type => RichText, { cascade: true })
  description: RichText;

  @Field(() => User)
  @ManyToOne(type => User)
  raisedBy: User;

  @Field(() => User)
  @ManyToOne(type => User, {
    nullable: true
  })
  @JoinColumn()
  assignedTo: User;

  @Field(() => [TestRun])
  @ManyToMany(
    type => TestRun,
    testRun => testRun.defects
  )
  @JoinTable()
  testRuns: TestRun[];

  @Field(() => [Comment])
  @OneToMany(
    type => Comment,
    comment => comment.defect
  )
  comments: Comment[];
}

@InputType()
export class CreateDefectInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  raisedBy: string;

  @Field({ nullable: true })
  assignedTo: string;

  @Field(() => [Number])
  testRuns: number[];
}

@InputType()
export class UpdateDefectInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  raisedBy: string;

  @Field({ nullable: true })
  assignedTo: string;

  @Field(() => [Number])
  testRuns: number[];
}

export default Defect;
