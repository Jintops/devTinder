
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
    "https://dev-tinder-frontend-sigma.vercel.app",
    "http://localhost:3000", // for local development
    "http://localhost:5173"  // if using Vite
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));


app.use(express.json()); 
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', profileRouter);
app.use('/api', requestRouter);
app.use('/api', userRouter);
app.use('/api', paymentRouter);
app.use('/api', chatRouter);




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



