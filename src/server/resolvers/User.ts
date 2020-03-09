import { Resolver, Query, Arg, Mutation } from "type-graphql";
import User, { CreateUserInput } from "../models/User";

@Resolver(() => User)
class UserResolver {
  @Query(returns => User)
  async user(@Arg("username") username: string) {
    return await User.findOne({ username });
  }

  @Query(returns => [User])
  async users() {
    return await User.find();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = User.create(data);
    return await user.save();
  }
}

export default UserResolver;
