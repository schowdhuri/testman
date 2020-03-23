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
import {
  ObjectType,
  Field,
  ID,
  InputType,
  registerEnumType
} from "type-graphql";

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

export enum Severity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

registerEnumType(Status, {
  name: "Status",
  description: "Defect Status"
});

registerEnumType(Severity, {
  name: "Severity",
  description: "Defect Severity"
});

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

  @Field(type => Status)
  @Column({
    type: "enum",
    enum: Status,
    default: Status.OPEN
  })
  status: string;

  @Field(type => Severity)
  @Column({
    type: "enum",
    enum: Severity,
    default: Severity.MEDIUM
  })
  severity: string;

  @Field(type => RichText)
  @OneToOne(type => RichText, { cascade: true })
  @JoinColumn()
  description: RichText;

  @Field(() => User)
  @ManyToOne(type => User)
  raisedBy: User;

  @Field(type => User, { nullable: true })
  @ManyToOne(type => User, {
    nullable: true
  })
  @JoinColumn()
  assignedTo: User;

  @Field(type => [TestRun], {
    defaultValue: []
  })
  @ManyToMany(
    type => TestRun,
    testRun => testRun.defects
  )
  @JoinTable()
  testRuns: TestRun[];

  @Field(type => [Comment], {
    defaultValue: []
  })
  @OneToMany(
    type => Comment,
    comment => comment.defect
  )
  comments: Comment[];

  static getByTestCase(testCaseId: number) {
    return this.createQueryBuilder("defect")
      .innerJoin("defect.testRuns", "testRuns")
      .innerJoin("testRuns.testCase", "testCase")
      .where("testCase.id = :testCaseId", { testCaseId })
      .getMany();
  }
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

  @Field(type => Severity, {
    defaultValue: Severity.MEDIUM
  })
  severity: string;

  @Field(type => [Number])
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

  @Field(type => Severity, {
    defaultValue: Severity.MEDIUM
  })
  severity: string;

  @Field({ nullable: true })
  raisedBy: string;

  @Field({ nullable: true })
  assignedTo: string;

  @Field(() => [Number])
  testRuns: number[];
}

export default Defect;
