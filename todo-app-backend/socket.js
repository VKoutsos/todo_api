const { Server } = require("socket.io");

function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "DELETE"]
        }
    });

    const connectedUsers = new Map();

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);

        // Track which user is assigned to this socket
        let currentUserId = null;

        socket.on("user_connected", (userId) => {
            connectedUsers.set(userId, socket.id);
            currentUserId = userId;
            console.log(`User ${userId} connected with socket ${socket.id}`);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
            if (currentUserId && connectedUsers.get(currentUserId) === socket.id) {
                connectedUsers.delete(currentUserId);
            }
        });
    });

    return { io, connectedUsers };
}

module.exports = initSocket;
