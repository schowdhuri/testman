import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field(returns => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @CreateDateColumn()
  created: string;

  @Field()
  @UpdateDateColumn()
  modified: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  authid: string;
}

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  authid: string;
}

export default User;
