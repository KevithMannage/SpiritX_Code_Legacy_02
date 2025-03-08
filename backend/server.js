import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import { Server } from 'socket.io';
import http from 'http';
import AdminController from './Controllers/adminController.js';
import userroutes from "./Routes/useroute.js";
import playerroutes from "./Routes/playeroute.js";
dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: '*' } }); // Initialize Socket.IO

app.use(cors());
app.use(express.json());
app.use("/user", userroutes);
app.use("/player", playerroutes);
// Mount admin routes
app.use('/api/players', adminRoutes);
AdminController.startRealTimeUpdates(io);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io accessible in routes/controllers
app.set('socketio', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});