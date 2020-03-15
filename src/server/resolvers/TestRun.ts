import { Resolver, Query, Arg, Mutation } from "type-graphql";
import TestRun, {
  CreateTestRunInput,
  UpdateTestRunInput
} from "../models/TestRun";

@Resolver(() => TestRun)
class TestRunResolver {
  @Query(returns => TestRun)
  async getTestRun(@Arg("id") id: number) {
    const testRun = await TestRun.findOne(
      { id },
      {
        relations: ["testCase", "defects", "user"]
      }
    );
    return testRun;
  }

  @Query(returns => [TestRun])
  async getTestRuns() {
    return await TestRun.find({
      relations: ["testCase", "testCase.description", "defects", "user"]
    });
  }

  @Mutation(returns => TestRun)
  async createTestRun(@Arg("data") data: CreateTestRunInput) {
    const testRun = TestRun.create(data);
    return await testRun.save();
  }

  @Mutation(returns => TestRun)
  async updateTestRun(@Arg("data") data: UpdateTestRunInput) {
    const testRun = await TestRun.findOne({ id: data.id });
    if (!testRun) {
      throw new Error("TestRun not found");
    }
    Object.assign(testRun, data);
    return await testRun.save();
  }

  @Mutation(returns => Boolean)
  async deleteTestRun(@Arg("id") id: number) {
    const testRun = await TestRun.findOne({ id });
    if (!testRun) {
      throw new Error("TestRun not found");
    }
    await testRun.remove();
    return true;
  }
}

export default TestRunResolver;
