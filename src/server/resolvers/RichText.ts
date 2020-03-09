import { Resolver, Arg, Query, Mutation } from "type-graphql";
import RichText, { CreateRichTextInput } from "../models/RichText";

@Resolver(of => RichText)
class RichTextResolver {
  @Query(returns => RichText)
  async richText(@Arg("id") id: number) {
    return RichText.findOne({ id });
  }

  @Mutation(() => RichText)
  async createRichText(@Arg("data") data: CreateRichTextInput) {
    const richText = RichText.create(data);
    return await richText.save();
  }
}

export default RichTextResolver;
