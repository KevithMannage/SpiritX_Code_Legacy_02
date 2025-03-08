import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import { Server } from 'socket.io';
import http from 'http';
import teamrouters from './Routes/teamroute.js';
import userroutes from "./Routes/useroute.js";
import playerroutes from "./Routes/playeroute.js";
dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: '*' } }); // Initialize Socket.IO

app.use(cors());
app.use(express.json());
app.use(cors());
app.use("/user", userroutes);
app.use("/player", playerroutes);
app.use("/team", teamrouters);



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
