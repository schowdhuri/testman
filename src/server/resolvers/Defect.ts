import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { In } from "typeorm";
import Defect, { CreateDefectInput, UpdateDefectInput } from "../models/Defect";
import RichText from "../models/RichText";
import TestRun from "../models/TestRun";

@Resolver(of => Defect)
class DefectResolver {
  @Query(returns => [Defect])
  async getDefects() {
    return await Defect.find({
      relations: ["description", "raisedBy", "assignedTo"]
    });
  }

  @Query(returns => Defect)
  async getDefect(@Arg("id") id: number) {
    return await Defect.findOne(
      { id },
      {
        relations: [
          "description",
          "raisedBy",
          "assignedTo",
          "comments",
          "comments.content"
        ]
      }
    );
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

  @Mutation(returns => Defect)
  async updateDefect(@Arg("data") data: UpdateDefectInput) {
    const defect = await Defect.findOne(
      { id: data.id },
      {
        relations: ["description"]
      }
    );
    if (data.description) {
      defect.description.value = data.description;
      delete data.description;
    }
    if (data.testRuns) {
      data.testRuns = await TestRun.find({
        id: In(data.testRuns)
      });
    }
    Object.assign(defect, data);
    return await defect.save();
  }

  @Mutation(returns => Boolean)
  async deleteDefect(@Arg("id") id: number) {
    const defect = await Defect.findOne(
      { id },
      {
        relations: ["comments", "comments.content"]
      }
    );
    if (!defect) {
      throw new Error("Defect not found");
    }
    const pArr = [];
    defect.comments.forEach(c => {
      pArr.push(c.content.remove());
      pArr.push(c.remove());
    });
    pArr.push(defect.remove());
    await Promise.all(pArr);
    return true;
  }
}
