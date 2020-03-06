import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable
} from "typeorm";

import TestCase from "./TestCase";

@Entity()
class TestPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  modified: string;

  @Column()
  name: string;

  @OneToMany(type => TestCase)
  testCases: TestCase[];
}

export default TestPlan;
