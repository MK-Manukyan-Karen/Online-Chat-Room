import Room from "../models/Room.js";
import User from "../models/User.js";
import Message from "../models/Message.js";
import errorHandler from "../utils/errorHandler.js";

export const createRoom = async (req, res) => {
  try {
    const { roomName, userName,socketID,meAvatar } = req.body;
    const room = await Room.findOne({roomID : roomName});
  
    if (room) {
      const me = await new User({
        userName,
        roomID : roomName,
        avatarIcon: meAvatar,
        socketID
      });
      await me.save();
      res.status(200).json({me,roomID: room._id});

    } else {
      const room = await new Room({ roomID : roomName});
      const me = await new User({
        userName,
        roomID : roomName,
        avatarIcon: meAvatar,
        socketID
      })
      await room.save();
      await me.save();
      res.status(201).json({me,roomID: room._id});
    }
  } catch (error) {
    errorHandler(res, error);
  }
};


export const getRoomUsersAndMessages = async (req, res) => {

  try {
    const { roomName } = req.params;
    const users = await User
                           .find({roomID : roomName})
                           .sort({userName:1})
                           .collation({ locale: "en", caseLevel: true });
    const messages = await Message.find({roomID : roomName})
    
    res.status(200).json({users,messages});
 
  } catch (error) {
    errorHandler(res, error);
  }
};












