import User from "../models/User";

export async function find(id: number) {
  if (id) return await User.findOne({ id });
  else return await User.find();
}
