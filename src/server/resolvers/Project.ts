import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { In } from "typeorm";

import Project, {
  CreateProjectInput,
  UpdateProjectInput
} from "../models/Project";
import RichText from "../models/RichText";
import Defect from "../models/Defect";
import User from "../models/User";

@Resolver(of => Project)
class ProjectResolver {
  @Query(returns => [Project])
  async getProjects() {
    return await Project.find({ relations: ["description"] });
  }

  @Query(returns => Project)
  async getProject(@Arg("id") id: number) {
    const project = await Project.findOne(
      { id },
      {
        relations: ["description", "testPlans", "execCycles", "users"]
      }
    );
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  @Mutation(returns => Project)
  async createProject(@Arg("data") data: CreateProjectInput) {
    const description = new RichText();
    description.value = data.description;
    data.description = description;
    if(data.users && data.users.length) {
      data.users = await User.find({
        id: In(data.users)
      });
    }
    const project = await Project.create(data);
    return await project.save();
  }

  @Mutation(returns => Project)
  async updateProject(@Arg("data") data: UpdateProjectInput) {
    const project = await Project.findOne(
      { id: data.id },
      {
        relations: ["description", "testPlans", "execCycles", "users"]
      }
    );
    if (!project) {
      throw new Error("Project not found");
    }
    if(data.users && data.users.length) {
      const users = await User.find({
        id: In(data.users)
      });
      if(users.length !== data.users.length) {
        throw new Error("User not found");
      }
      data.users = users;
    }
    const description = project.description;
    description.value = data.description;
    data.description = description;
    Object.assign(project, data);
    return await project.save();
  }

  @Mutation(returns => Boolean)
  async deleteProject(@Arg("id") id: number) {
    const project = await Project.findOne(
      { id },
      {
        relations: ["description", "testPlans", "execCycles", "users"]
      }
    );
    if (!project) {
      throw new Error("Project not found");
    }
    if(project.testPlans && project.testPlans.length) {
      throw new Error("Can't delete a project with one or more Test Plans")
    }
    if(project.execCycles && project.execCycles.length) {
      throw new Error("Can't delete a project with one or more ExecCycles")
    }
    const description = project.description;
    await project.remove();
    await description.remove();
    return true;
  }
}
