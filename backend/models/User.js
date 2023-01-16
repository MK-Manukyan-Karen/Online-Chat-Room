import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },

  roomID : {
    type: String,
  },

  avatarIcon: {
    type: String,
    default: "",
  },
  socketID : {
    type : String
  }
});

export default mongoose.model("users", UserSchema);


