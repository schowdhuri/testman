import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root
} from "type-graphql";
import TestCase, {
  CreateTestCaseInput,
  UpdateTestCaseInput
} from "../models/TestCase";
import RichText from "../models/RichText";
import User from "../models/User";

@Resolver(of => TestCase)
class TestCaseResolver {
  @Query(returns => TestCase)
  async getTestCase(@Arg("id") id: number) {
    return await TestCase.findOne(
      { id },
      {
        relations: ["description", "addedBy", "comments", "comments.content"]
      }
    );
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
    description.value = data.description;
    testCase.description = description;
    return await testCase.save();
  }

  @Mutation(returns => TestCase)
  async updateTestCase(@Arg("data") data: UpdateTestCaseInput) {
    const testCase = await TestCase.findOne(
      { id: data.id },
      {
        relations: ["description"]
      }
    );
    if (!testCase) {
      throw new Error("TestCase not found");
    }
    testCase.name = data.name;
    testCase.description.value = data.description;
    await testCase.save();
    return testCase;
  }

  @Mutation(returns => Boolean)
  async deleteTestCase(@Arg("id") id: number) {
    const testCase = await TestCase.findOne(
      { id },
      {
        relations: ["description", "comments", "comments.content"]
      }
    );
    if (!testCase) {
      throw new Error("TestCase not found");
    }
    console.dir(
      testCase.comments.map(c => c.content),
      { depth: null }
    );
    const arrRichText = testCase.comments.map(c => c.content);
    arrRichText.push(testCase.description);
    const arrComments = testCase.comments;
    await Promise.all(arrComments.map(c => c.remove()));
    await testCase.remove();
    await Promise.all(arrRichText.map(c => c.remove()));
    return true;
  }
}

export default TestCaseResolver;
