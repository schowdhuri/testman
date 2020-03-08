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
  JoinTable
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

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
  @OneToOne(type => RichText)
  @JoinColumn()
  description: RichText;

  @Field(() => User)
  @OneToOne(type => User)
  @JoinColumn()
  assignee: User;

  @Field(() => [TestRun])
  @ManyToMany(type => TestRun)
  @JoinTable()
  testRuns: TestRun[];

  @Field(() => [Comment])
  @OneToMany(
    type => Comment,
    comment => comment.defect
  )
  comments: Comment[];
}

export default Defect;
