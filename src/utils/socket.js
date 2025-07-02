const socket=require("socket.io")

const crypto=require('crypto')

const getSecretRoomId=(userId,targetUserId)=>{
    return crypto.createHash("sha256").update([userId,targetUserId].sort().join("$")).digest("hex")
}

const initilizeSocket=(server)=>{
     const io=socket(server,{
        cors:{
            origin: 'http://localhost:5173',
        }
     })
 io.on("connection",(socket)=>{

    socket.on("joinChat",({userId,targetUserId})=>{
      
      const roomId=getSecretRoomId(userId,targetUserId)
     console.log("joing roomh: "+roomId)

     socket.join(roomId)
    })
     socket.on("sendMessage",({firstName,userId,targetUserId,text})=>{
         const roomId=getSecretRoomId(userId,targetUserId)
         console.log(firstName +": "+ text)
         io.to(roomId).emit("messageReceiver",{firstName,text})
        
    })


     socket.on("disconnect",()=>{
        
    })

 })

}

module.exports=initilizeSocket;