import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { In } from "typeorm";
import Defect, { CreateDefectInput } from "../models/Defect";
import RichText from "../models/RichText";
import TestRun from "../models/TestRun";

@Resolver(of => Defect)
class DefectResolver {
  @Query(returns => [Defect])
  async defects() {
    return await Defect.find()
  }

  @Query(returns => Defect)
  async defect(@Arg("id") id: number) {
    return await Defect.findOne({ id });
  }

  @Mutation(returns => Defect)
  async createDefect(@Arg("data") data: CreateDefectInput) {
    data.description = data.description || "";
    const description = new RichText();
    description.value = data.description;
    data.description = description;
    data.testRuns = await TestRun.find({
      id: In(data.testRuns)
    });
    const defect = Defect.create(data);
    return await defect.save();
  }
}
