import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable
} from "typeorm";
import {
  ObjectType,
  Field,
  ID,
  InputType
} from "type-graphql";

import ExecCycle from "./ExecCycle";
import RichText from "./RichText";
import TestPlan from "./TestPlan";
import User from "./User";

@ObjectType()
@Entity()
class Project extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(type => [User], {
    defaultValue: []
  })
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  @Field(type => RichText)
  @OneToOne(type => RichText, { cascade: true })
  @JoinColumn()
  description: RichText;

  @Field(type => TestPlan, {
    nullable: true
  })
  @OneToMany(
    type => TestPlan,
    testPlan => testPlan.project
  )
  testPlans: TestPlan[];

  @Field(type => ExecCycle, {
    nullable: true
  })
  @OneToMany(
    type => ExecCycle,
    execCycle => execCycle.project
  )
  execCycles: ExecCycle[];
}

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(type => [Number], {
    nullable: true
  })
  users: number[];
}

@InputType()
export class UpdateProjectInput {
  @Field()
  id: number;

  @Field()
  name: string

  @Field()
  description: string;

  @Field(type => [Number], { nullable: true })
  users: number[];
}

export default Project;
