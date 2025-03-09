import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import { Server } from 'socket.io';
import http from 'http';

import userroutes from "./routes/useroute.js";
import playerroutes from "./routes/playeroute.js";
import budgetroutes from './routes/BudjetRoute.js';
import teamRoutes from './routes/teamRoutes.js';

// Load environment variables
dotenv.config();



const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:5173' } }); // Specific origin

app.use(cors());
app.use(express.json());

// Mount admin routes
app.use('/api/players', adminRoutes);
app.use("/user", userroutes);
app.use("/play", playerroutes);
app.use("/team" , teamRoutes);

app.use("/budget",budgetroutes);


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