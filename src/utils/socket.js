const socket=require("socket.io")

const initilizeSocket=(server)=>{
     const io=socket(server,{
        cors:{
            origin: 'http://localhost:5173',
        }
     })
 io.on("connection",(socket)=>{

    socket.on("joinChat",({userId,targetUserId})=>{
      
      const roomId=[userId,targetUserId].sort().join("_")
     console.log("joing roomh: "+roomId)

     socket.join(roomId)
    })
     socket.on("sendMessage",({firstName,userId,targetUserId,text})=>{
         const roomId=[userId,targetUserId].sort().join("_")
         console.log(firstName +": "+ text)
         io.to(roomId).emit("messageReceiver",{firstName,text})
        
    })


     socket.on("disconnect",()=>{
        
    })

 })

}

module.exports=initilizeSocket;