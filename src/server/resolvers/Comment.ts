import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Comment, { CreateCommentInput, UpdateCommentInput } from "../models/Comment";
import RichText from "../models/RichText";
import Defect from "../models/Defect";
import TestCase from "../models/TestCase";
import User from "../models/User";

@Resolver(of => Comment)
class CommentResolver {
  @Mutation(returns => Comment)
  async createComment(@Arg("data") data: CreateCommentInput) {
    data.user = await User.findOne({ username: data.user });
    if(data.testCaseId) {
      data.testCase = await TestCase.findOne({ id: data.testCase });
    } else if (data.defectId) {
      data.defect = await Defect.findOne({ id: data.defect });
    }
    const content = new RichText();
    content.value = data.content;
    data.content = content;
    const comment = Comment.create(data);
    return await comment.save();
  }

  @Mutation(returns => Comment)
  async updateComment(@Arg("data") data: UpdateCommentInput) {
    const comment = await Comment.findOne({ id: data.id }, {
      relations: ["content"]
    });
    if(!comment) {
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
    const comment = await Comment.findOne({ id });
    if(!comment) {
      throw new Error("Comment not found");
    }
    await comment.remove();
    return true;
  }
}
