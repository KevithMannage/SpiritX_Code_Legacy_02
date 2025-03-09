import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import { Server } from "socket.io";
import http from "http";

import userroutes from "./Routes/useroute.js";
import playerroutes from "./Routes/playeroute.js";
import teamroutes from "./Routes/teamroute.js";
dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: "*" } }); // Initialize Socket.IO

app.use(cors());
app.use(express.json());

app.use("/user", userroutes);
app.use("/player", playerroutes);
app.use("/team", teamroutes);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
