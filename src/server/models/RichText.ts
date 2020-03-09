import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType()
@Entity()
class RichText extends BaseEntity {
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
  value: string;
}

@InputType()
export class CreateRichTextInput implements Partial<RichText> {
  @Field()
  value: string;
}

export default RichText;
