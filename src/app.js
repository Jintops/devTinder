
require('dotenv').config()
const express = require('express');
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors');
const paymentRouter = require('./routes/payment');
const http=require('http')
const initilizeSocket=require("./utils/socket");
const chatRouter = require('./routes/chat');

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dev-tinder-frontend-sigma.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json()); 
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/',paymentRouter);
app.use('/',chatRouter)



const server=http.createServer(app)
initilizeSocket(server);

connectDB().then(() => {
  console.log("database connected successfully....")
  server.listen(process.env.PORT, () => {
    console.log('successfully connected to port')
  });

}).catch((err) => {
  console.error(" db connection failed")
});



