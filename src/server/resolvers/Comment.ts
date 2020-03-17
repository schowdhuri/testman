import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Comment, {
  CreateCommentInput,
  UpdateCommentInput
} from "../models/Comment";
import RichText from "../models/RichText";
import Defect from "../models/Defect";
import TestCase from "../models/TestCase";
import User from "../models/User";

@Resolver(of => Comment)
class CommentResolver {
  @Mutation(returns => Comment)
  async createComment(@Arg("data") data: CreateCommentInput) {
    data.user = await User.findOne({ username: data.user });
    if (data.testCase) {
      data.testCase = await TestCase.findOne({ id: data.testCase });
      if(!data.testCase) {
        throw new Error("TestCase not found");
      }
    } else if (data.defect) {
      data.defect = await Defect.findOne({ id: data.defect });
      if(!data.defect) {
        throw new Error("Defect not found");
      }
    } else {
      throw new Error("Either TestCase or Defect required");
    }
    const content = new RichText();
    content.value = data.content;
    data.content = content;
    const comment = Comment.create(data);
    return await comment.save();
  }

  @Mutation(returns => Comment)
  async updateComment(@Arg("data") data: UpdateCommentInput) {
    const comment = await Comment.findOne(
      { id: data.id },
      {
        relations: ["content", "user"]
      }
    );
    if (!comment) {
      throw new Error("Comment not found");
    }
    const content = comment.content;
    content.value = data.content;
    data.content = content;
    Object.assign(comment, data);
    return await comment.save();
  }

  @Mutation(returns => Boolean)
  async deleteComment(@Arg("id") id: number) {
    const comment = await Comment.findOne({ id }, { relations: ["content"] });
    if (!comment) {
      throw new Error("Comment not found");
    }
    const content = comment.content;
    await comment.remove();
    await content.remove();
    return true;
  }
}
