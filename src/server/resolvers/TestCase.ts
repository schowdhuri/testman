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
  async getTestCase(@Arg("id") id: number) {
    return await TestCase.findOne({ id }, {
      relations: ["description", "addedBy", "comments", "comments.content"]
    });
  }

  @Query(returns => [TestCase])
  async getTestCases() {
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

  @Mutation(returns => Boolean)
  async deleteTestCase(@Arg("id") id: number) {
    const testCase = await TestCase.findOne({ id }, {
      relations: ["description", "comments", "comments.content"]
    });
    if(!testCase) {
      throw new Error("TestCase not found");
    }
    const pArr = [];
    testCase.comments.forEach(c => {
      pArr.push(c.content.remove());
      pArr.push(c.remove());
    });
    pArr.push(testCase.remove());
    await Promise.all(pArr);
    return true;
  }
}

export default TestCaseResolver;
