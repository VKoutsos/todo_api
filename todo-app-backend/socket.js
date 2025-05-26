const socketIo = require('socket.io');

//stores online users:{userId:socketId}
const connectedUsers={};

const initSocket=(server)=>{
    const io = socketIo(server,{
        cors:{
            origin:"http://localhost:4200",//angular frontend
            methods:["GET","POST","PUT","DELETE"]
        }
    });

    io.on('connection',(socket)=>{
        console.log("New client connected:", socket.id);

        //register user when they log in (frontend emits "register")
        socket.on('register',(userId)=>{
            connectedUsers[userId]=socket.id;
            console.log(`User ${userId} connected (Socket ID: ${socket.id})`);
        });

        //clean up on disconnect
        socket.on('disconnect',()=>{
            console.log('Client disconnected:', socket.id);
            for (const [userId,socketId] of Object.entries(connectedUsers)) {
                if (socketId===socket.id ) {
                    delete connectedUsers[userId];
                    console.log(`Removed user ${userId} from connections`);
                    break;
                }
            }
        });
    });

    return {io,connectedUsers};
};

module.exports=initSocket;