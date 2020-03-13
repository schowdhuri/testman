import { Resolver, Query, Arg, Mutation } from "type-graphql";
import TestRun, { CreateTestRunInput } from "../models/TestRun";

@Resolver(() => TestRun)
class TestRunResolver {
  @Query(returns => TestRun)
  async getTestRun(@Arg("id") id: number) {
    return await TestRun.findOne({ id });
  }

  @Query(returns => [TestRun])
  async getTestRuns() {
    return await TestRun.find();
  }

  @Mutation(() => TestRun)
  async createTestRun(@Arg("data") data: CreateTestRunInput) {
    const testRun = TestRun.create(data);
    return await testRun.save();
  }
}

export default TestRunResolver;
