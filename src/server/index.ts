import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer, gql } from "apollo-server-express";

import DB from "./utils/DB";
import resolvers from "./resolvers";

async function main() {
  const db = new DB();
  await db.connect();

  const app = express();
  app.use(express.json());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers
    })
  });
  apolloServer.applyMiddleware({ app });

  app.get("/api/ping", (req, res) => {
    res.send("OK");
  });

  // app.get("/api/user", async (req, res) => {
  //   res.json(await controllers.User.find());
  // });

  // app.get("/api/testcase", async (req, res) => {
  //   res.json(await controllers.TestCase.find());
  // });

  app.listen(3001, () => {
    console.log(`API server ready...${apolloServer.graphqlPath}`);
  });
}

main();
