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
import { ObjectType, Field, ID, InputType } from "type-graphql";

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
  @OneToOne(type => RichText, { cascade: true })
  @JoinColumn()
  content: RichText;

  @Field()
  @ManyToOne(type => User)
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

@InputType()
export class CreateCommentInput {
  @Field()
  content: string;

  @Field()
  user: string;

  @Field({ nullable: true })
  defect: number;

  @Field({ nullable: true })
  testCase: number;
}

@InputType()
export class UpdateCommentInput {
  @Field()
  content: string;
}

export default Comment;
