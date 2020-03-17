import { In } from "typeorm";
import { Resolver, Arg, Query, Mutation } from "type-graphql";
import ExecCycle, {
  CreateExecCycleInput,
  UpdateExecCycleInput
} from "../models/ExecCycle";
import TestRun from "../models/TestRun";

@Resolver()
class ExecCycleResolver {
  @Query(returns => [ExecCycle])
  async getExecCycles() {
    return await ExecCycle.find();
  }

  @Query(returns => ExecCycle)
  async getExecCycle(@Arg("id") id: number) {
    return await ExecCycle.findOne(
      { id },
      {
        relations: ["testRuns", "testRuns.testCase", "testRuns.defects"]
      }
    );
  }

  @Mutation(returns => ExecCycle)
  async createExecCycle(@Arg("data") data: CreateExecCycleInput) {
    if (data.testRuns) {
      data.testRuns = await TestRun.find({
        id: In(data.testRuns)
      });
    }
    const execCycle = ExecCycle.create(data);
    return await execCycle.save();
  }

  @Mutation(returns => ExecCycle)
  async updateExecCycle(@Arg("data") data: UpdateExecCycleInput) {
    const execCycle = await ExecCycle.findOne({ id: data.id });
    if (!execCycle) {
      throw new Error("ExecCycle not found");
    }
    if (data.testRuns) {
      data.testRuns = await TestRun.find({
        id: In(data.testRuns)
      });
    }
    Object.assign(execCycle, data);
    return await execCycle.save();
  }

  @Mutation(returns => Boolean)
  async deleteExecCycle(@Arg("id") id: number) {
    const execCycle = await ExecCycle.findOne(
      { id },
      {
        relations: ["testRuns"]
      }
    );
    if (!execCycle) {
      throw new Error("ExecCycle not found");
    }
    if (execCycle.testRuns.length) {
      throw new Error("ExecCycle not empty");
    }
    await execCycle.remove();
    return true;
  }
}

export default ExecCycleResolver;
