import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne
} from "typeorm";
import { ObjectType, ID, Field, InputType } from "type-graphql";

import Project from "./Project";
import TestRun from "./TestRun";

export enum Status {
  NEW = "New",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed"
}

@ObjectType()
@Entity()
class ExecCycle extends BaseEntity {
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

  @Field(type => Project)
  @ManyToOne(type => Project, project => project.execCycles)
  project: Project;

  @Field({ nullable: true })
  @Column({
    type: "date",
    nullable: true
  })
  startDate: string;

  @Field({ nullable: true })
  @Column({
    type: "date",
    nullable: true
  })
  endDate: string;

  @Field()
  @Column({
    type: "enum",
    enum: Status,
    default: Status.NEW
  })
  status: string;

  @Field(type => [TestRun], {
    defaultValue: []
  })
  @OneToMany(
    type => TestRun,
    testRun => testRun.execCycle
  )
  testRuns: TestRun[];
}

@InputType()
export class CreateExecCycleInput {
  @Field()
  name: string;

  @Field(type => [Number], {
    defaultValue: []
  })
  testRuns: Number[];

  @Field(type => Number)
  project: number;
}

@InputType()
export class UpdateExecCycleInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(type => [Number], {
    nullable: true
  })
  testRuns: Number[];
}

export default ExecCycle;
