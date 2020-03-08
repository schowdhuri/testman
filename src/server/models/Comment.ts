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
import { ObjectType, Field, ID } from "type-graphql";

import RichText from "./RichText";
import User from "./User";
import Defect from "./Defect";
import TestCase from "./TestCase";

@ObjectType()
@Entity()
class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created: string;

  @Field()
  @UpdateDateColumn()
  modified: string;

  @Field(() => RichText)
  @OneToOne(type => RichText)
  @JoinColumn()
  content: RichText;

  @Field(() => User)
  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @Field(() => Defect)
  @ManyToOne(
    type => Defect,
    defect => defect.comments
  )
  defect: Defect;

  @Field(() => TestCase)
  @ManyToOne(
    type => TestCase,
    testCase => testCase.comments
  )
  testCase: TestCase;
}

export default Comment;
