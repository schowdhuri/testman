import { Resolver, Query, Arg } from "type-graphql";
import User from "../models/User";

// export async function find(id: number) {
//   if (id) return await User.findOne({ id });
//   else return await User.find();
// }

@Resolver()
class UserResolver {

  @Query(returns => User)
  async user(@Arg("id") id: number) {
    return await User.findOne({ id });
  }

  @Query(returns => [User])
  async users() {
    return await User.find();
  }
}

export default UserResolver;
