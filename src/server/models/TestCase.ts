import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm";

import Comment from "./Comment";
import RichText from "./RichText";
import TestPlan from "./TestPlan";
import User from "./User";

export enum Status {
  NEW = "New",
  PASS = "Pass",
  FAIL = "Fail"
}

@Entity()
class TestCase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  modified: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.NEW
  })
  status: string;

  @OneToOne(type => RichText)
  @JoinColumn()
  description: RichText;

  @OneToOne(type => User)
  @JoinColumn()
  addedBy: User;

  @OneToMany(
    type => Comment,
    comment => comment.testCase
  )
  comments: Comment[];

  @ManyToOne(
    type => TestPlan,
    testPlan => testPlan.testCases
  )
  testPlan: TestPlan;
}

export default TestCase;
