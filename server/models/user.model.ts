import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true },
});

export const User = model("User", UserSchema);
