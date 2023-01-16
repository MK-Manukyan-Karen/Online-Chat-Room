import User from "../models/User.js";
import Message from "../models/Message.js";

export const socketControllers = (io,socket) => {

  socket.on("ROOM:JOIN", async (me) => {

    const { roomID } = me
    socket.join(roomID);
    const users = await User.find({ roomID });
    socket.broadcast.to(roomID).emit("ROOM:JOINED", { roomUsers:users });

  });

  socket.on("NEW-MESSAGE:SEND-MESSAGE", async ({ newMessage = '', roomID = '', _id }) => {
        
    try {

      const user = await User.findById({ _id });
      await new Message({roomID, message: newMessage,user, messageID: _id}).save();
      const messages = await Message.find({ roomID });
      io.in(roomID).emit("MESSAGE:NEW-MESSAGE", messages);

    } catch (error) {
      console.log("ErrorMessage:", error);
    }
  });


  socket.on("USER:JOINED", async (me) => {
        
    try {

      const {roomID,_id} = me
      await new Message({roomID, message: '', messageID:_id,userStatusInChat : { user :me, status : true}}).save();
      const messages = await Message.find({ roomID });
      socket.broadcast.to(roomID).emit("MESSAGE:NEW-MESSAGE", messages )
    } catch (error) {
      console.log("ErrorMessage:", error);
    }
  });
  

  socket.on("disconnect", async () => {

    const user = await User.findOne({ socketID: socket.id });
    if (user) {

      const { roomID } = user;
      await new Message({roomID, message: '', messageID: user._id,userStatusInChat : { user, status : false}}).save();
      const messages = await Message.find({ roomID });
      socket.broadcast.to(roomID).emit("MESSAGE:NEW-MESSAGE", messages )
      await Message.find({ roomID, messageID: user._id }).deleteMany();
      await User.findOne({ socketID: socket.id }).deleteOne();
      const users = await User.find({ roomID });
      socket.broadcast.to(roomID).emit("SET-ALL-USERS:IN-CHAT", {roomUsers: users})
    }
  });

  socket.on("USER:LEAVE-CHAT", async ({ _id, roomID }) => {
      const user = await User.findOne({ _id });
      await new Message({roomID, message: '', messageID: user._id,userStatusInChat : { user, status : false}}).save();
      const messages = await Message.find({ roomID });
      socket.broadcast.to(roomID).emit("MESSAGE:NEW-MESSAGE", messages )
      await Message.find({ roomID, messageID: user._id }).deleteMany();
      await User.findOne({ socketID: socket.id }).deleteOne();
      const users = await User.find({ roomID });
      socket.broadcast.to(roomID).emit("SET-ALL-USERS:IN-CHAT", {roomUsers: users})

  });

};

