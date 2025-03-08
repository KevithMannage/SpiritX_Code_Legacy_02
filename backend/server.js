import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import userroutes from "./Routes/useroute.js";
import playerroutes from "./Routes/playeroute.js";
import teamroutes from "./Routes/teamroute.js";
dotenv.config();


const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/user", userroutes);
app.use("/player", playerroutes);
app.use("/team", teamroutes);
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
