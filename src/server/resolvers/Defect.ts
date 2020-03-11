import { Resolver, Query, Arg, Mutation } from "type-graphql";
import Defect, { CreateDefectInput } from "../models/Comment";

@Resolver(() => Comment)
class DefectResolver {
  @Query()
  defects() {
    return await Defect.find()
  }

  @Query()
  defect(@Arg("id") id: number) {
    return await Defect.findOne({ id });
  }

  @Mutation()
  createDefect(@Arg("data"): CreateDefectInput) {
    data.description = data.description || "";
    const description = new RichText();
    description.value = data.description;

    const defect = Defect.create(data);
    return await defect.save();
  }
}
