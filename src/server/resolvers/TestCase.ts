import { Resolver, Query, Arg } from "type-graphql";
import TestCase from "../models/TestCase";

class TestCaseResolver {

  @Query(returns => [TestCase])
  async testCases() {
    return await TestCase.find();
  }

  @Query(returns => TestCase)
  async testCase(@Arg("id") id: number) {
    return await TestCase.findOne({ id });
  }
}

export default TestCaseResolver;
