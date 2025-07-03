const mongoose=require('mongoose')


const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        required:true
    },

},{timeseries:true})


const chatSchema=new mongoose.Schema({
    participants:[{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},],
    messages:[messageSchema]
})


const chat=mongoose.Model("Chat",chatSchema)
module.exports=chat;