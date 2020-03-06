import express from "express";

import DB from "./utils/DB";
import controllers from "./controllers";

const db = new DB();
const app = express();

app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.send("OK");
});

app.get("/api/user", async (req, res) => {
  res.json(await controllers.User.find());
});

app.get("/api/testcase", async (req, res) => {
  res.json(await controllers.TestCase.find());
});

db.connect().then(() => {
  app.listen(3001, () => {
    console.log("API server ready...");
  });
});
