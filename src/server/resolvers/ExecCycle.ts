import { Resolver, Arg, Query, Mutation } from "type-graphql";
import ExecCycle, { CreateExecCycleInput } from "../models/ExecCycle";

@Resolver()
class ExecCycleResolver {
  @Query(() => [ExecCycle])
  async getExecCycles() {
    return ExecCycle.find();
  }

  @Query(() => ExecCycle)
  async getExecCycle(@Arg("id") id: number) {
    return await ExecCycle.findOne({ id });
  }

  @Mutation(() => ExecCycle)
  async createExecCycle(@Arg("data") data: CreateExecCycleInput) {
    const execCycle = ExecCycle.create(data);
    return await execCycle.save();
  }
}

export default ExecCycleResolver;
