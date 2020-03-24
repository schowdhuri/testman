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

import ExecCycle from "./ExecCycle";
import RichText from "./RichText";
import TestPlan from "./TestPlan";
import User from "./User";

@Entity()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  @OneToOne(type => RichText, { cascade: true })
  @JoinColumn()
  description: RichText;

  @OneToMany(
    type => TestPlan,
    testPlan => testPlan.project
  )
  testPlans: TestPlan[];

  @OneToMany(
    type => ExecCycle,
    execCycle => execCycle.project
  )
  execCycles: ExecCycle[];
}
