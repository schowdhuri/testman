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
      relations: [
        "description",
        "raisedBy",
        "assignedTo",
        "testRuns",
        "testRuns.testCase"
      ]
    });
  }

  @Query(returns => Defect)
  async getDefect(@Arg("id") id: number) {
    const defect = await Defect.findOne(
      { id },
      {
        relations: [
          "description",
          "raisedBy",
          "assignedTo",
          "testRuns",
          "testRuns.testCase",
          "comments",
          "comments.content"
        ]
      }
    );
    if (!defect) {
      throw new Error("Defect not found");
    }
    return defect;
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
    if (!defect) {
      throw new Error("Defect not found");
    }
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
        relations: ["description", "comments", "comments.content"]
      }
    );
    if (!defect) {
      throw new Error("Defect not found");
    }
    const arrContent = defect.comments.map(c => c.content);
    arrContent.push(defect.description);
    const arrComments = defect.comments;
    await Promise.all(arrComments.map(c => c.remove()));
    await defect.remove();
    await Promise.all(arrContent.map(c => c.remove()));
    return true;
  }
}
