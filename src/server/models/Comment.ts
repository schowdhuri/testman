import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn
} from "typeorm";

import RichText from "./RichText";
import User from "./User";
import Defect from "./Defect";
import TestCase from "./TestCase";

@Entity()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  modified: string;

  @OneToOne(type => RichText)
  @JoinColumn()
  content: RichText;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToOne(
    type => Defect,
    defect => defect.comments
  )
  defect: Defect;

  @ManyToOne(
    type => TestCase,
    testCase => testCase.comments
  )
  testCase: TestCase;
}

export default Comment;
