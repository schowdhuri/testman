import { In } from "typeorm";
import { Resolver, Arg, Query, Mutation } from "type-graphql";
import ExecCycle, {
  CreateExecCycleInput,
  UpdateExecCycleInput,
  Status
} from "../models/ExecCycle";

import Project from "../models/Project";
import TestRun, { Status as TestRunStatus } from "../models/TestRun";

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
        relations: [
          "project",
          "testRuns",
          "testRuns.testCase",
          "testRuns.defects"
        ]
      }
    );
  }

  @Mutation(returns => ExecCycle)
  async createExecCycle(@Arg("data") data: CreateExecCycleInput) {
    data.project = await Project.findOne({ id: data.project });
    if(!data.project) {
      throw new Error("Project not found");
    }
    if (data.testRuns && data.testRuns.length) {
      data.testRuns = await TestRun.find({
        id: In(data.testRuns)
      });
    }
    const execCycle = ExecCycle.create(data);
    return await execCycle.save();
  }

  @Mutation(returns => ExecCycle)
  async updateExecCycle(@Arg("data") data: UpdateExecCycleInput) {
    const execCycle = await ExecCycle.findOne(
      { id: data.id },
      {
        relations: ["project", "testRuns"]
      }
    );
    if (!execCycle) {
      throw new Error("ExecCycle not found");
    }
    if (data.testRuns && data.testRuns.length) {
      data.testRuns = await TestRun.find({
        id: In(data.testRuns)
      });
    } else {
      delete data.testRuns;
    }
    Object.assign(execCycle, data);
    return await execCycle.save();
  }

  @Mutation(returns => Boolean)
  async startExecCycle(@Arg("id") id: number) {
    const execCycle = await ExecCycle.findOne(
      { id },
      {
        relations: ["testRuns"]
      }
    );
    if (!execCycle) {
      throw new Error("ExecCycle not found");
    }
    if (!execCycle.testRuns || !execCycle.testRuns.length) {
      throw new Error("ExecCycle is empty");
    }
    if (execCycle.status !== Status.NEW) {
      throw new Error("ExecCycle can't be started");
    }
    execCycle.status = Status.IN_PROGRESS;
    execCycle.startDate = new Date();
    await execCycle.save();
    return true;
  }

  @Mutation(returns => Boolean)
  async stopExecCycle(@Arg("id") id: number) {
    const execCycle = await ExecCycle.findOne(
      { id },
      {
        relations: ["testRuns"]
      }
    );
    if (!execCycle) {
      throw new Error("ExecCycle not found");
    }
    if (!execCycle.testRuns || !execCycle.testRuns.length) {
      throw new Error("ExecCycle is empty");
    }
    if (execCycle.status !== Status.IN_PROGRESS) {
      throw new Error("ExecCycle not in progress");
    }
    // check if all TestRuns have been executed
    if (execCycle.testRuns.find(tr => tr.status === TestRunStatus.NEW)) {
      throw new Error(
        "There are unfinished TestRuns. ExecCycle can't be stopped"
      );
    }
    execCycle.status = Status.COMPLETED;
    execCycle.endDate = new Date();
    await execCycle.save();
    return true;
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
