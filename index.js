import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import chatRouter from './routes/chat.js'
import { socketControllers } from './socketControllers/socketControllers.js'


const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:'http://localhost:3000',
  }
});

//add new data in db
// const db = mongoose.connection
// db.collections.products.insertMany([])
dotenv.config()
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true ,
                                   useNewUrlParser : true,
                                   useUnifiedTopology: true,
                                   useUnifiedTopology : true
                                 })
   .then(() => console.log('MongoDB successfully connected.'))
   .catch( error => console.log(`You have a problem ))) : ${error}`))

app.use('/uploads',express.static('uploads'))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use('/chatRoom',chatRouter)

if(process.env.NODE_ENV === 'production'){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname+'/Client/build')))
  app.get('/*',(req,res) => {
   res.sendFile(path.join(__dirname+'/Client/build/index.html'))
  })

  
}

const onConnection = (socket) => {
  socketControllers(io, socket);
}

io.on('connection',onConnection)

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, (err) =>{
 if(err){
   throw Error(err)
 }
 console.log(`Node server has been started on ${PORT}`)
} )