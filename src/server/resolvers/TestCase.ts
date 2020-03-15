import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root
} from "type-graphql";
import TestCase, { CreateTestCaseInput } from "../models/TestCase";
import RichText from "../models/RichText";
import User from "../models/User";

@Resolver(of => TestCase)
class TestCaseResolver {
  @Query(returns => TestCase)
  async testCase(@Arg("id") id: number) {
    return await TestCase.findOne({ id }, {
      relations: ["description", "addedBy", "comments", "comments.content"]
    });
  }

  @Query(returns => [TestCase])
  async testCases() {
    return await TestCase.find({
      relations: ["addedBy"]
    });
  }

  @Mutation(returns => TestCase)
  async createTestCase(@Arg("data") data: CreateTestCaseInput) {
    data.addedBy = await User.findOne({ username: data.addedBy });
    const testCase = TestCase.create(data);
    const description = new RichText();
    description.value = data.descriptionText;
    testCase.description = description;
    return await testCase.save();
  }
}

export default TestCaseResolver;
