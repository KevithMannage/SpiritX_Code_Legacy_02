import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import { Server } from 'socket.io';
import http from 'http';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: '*' } }); // Initialize Socket.IO

app.use(cors());
app.use(express.json());

// Mount admin routes
app.use('/api/players', adminRoutes);

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