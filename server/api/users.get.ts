import { User } from "~/server/models/user.model";

export default defineEventHandler(async () => {
  return await User.find().exec();
});
