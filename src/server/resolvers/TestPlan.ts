import { In } from "typeorm";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import TestPlan, {
  CreateTestPlanInput,
  UpdateTestPlanInput
} from "../models/TestPlan";
import TestCase from "../models/TestCase";

@Resolver(of => TestPlan)
class TestPlanResolver {
  @Query(returns => [TestPlan])
  async getTestPlans() {
    return await TestPlan.find({
      relations: ["testCases"]
    });
  }

  @Query(returns => TestPlan)
  async getTestPlan(@Arg("id") id: number) {
    const testPlan = await TestPlan.findOne({ id }, {
      relations: ["testCases", "testCases.description"]
    });
    if(!testPlan) {
      throw new Error("TestPlan not found");
    }
    return testPlan;
  }

  @Mutation(returns => TestPlan)
  async createTestPlan(@Arg("data") data: CreateTestPlanInput) {
    if(data.testCases && data.testCases.length) {
      data.testCases = await TestCase.find({
        id: In(data.testCases)
      });
    }
    const testPlan = TestPlan.create(data);
    return await testPlan.save();
  }

  @Mutation(returns => TestPlan)
  async updateTestPlan(@Arg("data") data: UpdateTestPlanInput) {
    const testPlan = await TestPlan.findOne({ id: data.id });
    if(!testPlan) {
      throw new Error("TestPlan not found");
    }
    Object.assign(testPlan, data);
    return await testPlan.save();
  }

  @Mutation(returns => Boolean)
  async deleteTestPlan(@Arg("id") id: number) {
    const testPlan = await TestPlan.findOne({ id }, {
      relations: ["testCases"]
    });
    if(!testPlan) {
      throw new Error("TestPlan not found");
    }
    if(testPlan.testCases && testPlan.testCases.length) {
      throw new Error("TestPlan is not empty. Can't delete");
    }
    await testPlan.remove();
    return true;
  }
}

export default TestPlanResolver;
