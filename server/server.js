import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import { Socket } from "dgram";

const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

// Store online users
export const usersocketMap = {}; // {userId: socketId}

// Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);

    if(userId) usersocketMap[userId] = socket.id;

    // Emit online users to all connected client
    io.emit("getOnlineUsers", Object.keys(usersocketMap));

    socket.on("disconnect", () => {
        delete usersocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(usersocketMap));
    });
})

// Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

// Route setup

app.use("/api/status", (req, res) => res.send("Server is running"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// COnnect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));