import "reflect-metadata";
import { createConnection } from "typeorm";

import Defect from "../src/server/models/Defect";
import ExecCycle from "../src/server/models/ExecCycle";
import RichText from "../src/server/models/RichText";
import TestCase from "../src/server/models/TestCase";
import TestPlan from "../src/server/models/TestPlan";
import TestRun from "../src/server/models/TestRun";
import User from "../src/server/models/User";

async function initDB() {
  const conn = await createConnection({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "testman",
    entities: ["src/server/models/*.ts"],
    synchronize: true,
    logging: false
  });
  // Seed some data
  let user = User.create({
    username: "subir",
    name: "Subir",
    email: "subir@desdevpro.com",
    authid: "123"
  });
  await user.save();

  let testCase1 = TestCase.create({
    name: "tc 01",
    description: RichText.create({
      value: "tc 01 description"
    }),
    addedBy: user
  });
  await testCase1.save();

  let testCase2 = TestCase.create({
    name: "tc 02",
    description: RichText.create({
      value: "tc 02 description"
    }),
    addedBy: user
  });
  await testCase2.save();

  const testPlan = TestPlan.create({
    name: "Test Plan 01",
    testCases: [testCase1, testCase2]
  });
  await testPlan.save();

  const testRun1 = TestRun.create({
    user,
    testCase: testCase1
  });
  await testRun1.save();

  const execCycle = ExecCycle.create({
    name: "Execution Cycle 1",
    testRuns: [testRun1]
  });
  await execCycle.save();

  const defect1 = Defect.create({
    name: "defect 01",
    description: RichText.create({
      value: "Nothing works!"
    })
  });
  await defect1.save();

  // Read something
  const result = await Promise.all([
    TestPlan.find({ relations: ["testCases"] }),
    ExecCycle.find({ relations: ["testRuns"] }),
    User.find()
  ]);
  console.dir(result, { depth: null });
  conn.close();
}

console.log("Running setup...");

initDB().then(() => {
  console.log("Done");
});
