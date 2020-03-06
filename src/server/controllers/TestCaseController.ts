import TestCase from "../models/TestCase";

export async function find(id: number) {
  if (id) return await TestCase.findOne({ id });
  else return await TestCase.find();
}
