import mongoose from "mongoose"

const Schema = mongoose.Schema
const roomsSchema = new Schema({
  roomID: {
    type: String,
    required: true,
  },
});

export default mongoose.model("rooms", roomsSchema)
