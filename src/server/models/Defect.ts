import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from "typeorm";

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

@Entity()
class Defect extends BaseEntity {
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
    default: Status.OPEN
  })
  status: string;

  @OneToOne(type => RichText)
  @JoinColumn()
  description: RichText;

  @OneToOne(type => User)
  @JoinColumn()
  assignee: User;

  @ManyToMany(type => TestRun)
  @JoinTable()
  testRuns: TestRun[];

  @OneToMany(
    type => Comment,
    comment => comment.defect
  )
  comments: Comment[];
}

export default Defect;
