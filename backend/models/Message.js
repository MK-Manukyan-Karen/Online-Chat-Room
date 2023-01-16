import mongoose from "mongoose"
import { UserSchema } from "./User.js";

const Schema = mongoose.Schema
export const MessageSchema = new Schema(
  {
    message : {
        type: String,
    },
    user: {
      type: UserSchema,
    },
    roomID : {
      type : String
    },
    messageID : {
      type : Schema.Types.ObjectId,
      ref : 'users'
    },
    userStatusInChat : {
      status :Boolean,
      user : UserSchema
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("messages", MessageSchema);