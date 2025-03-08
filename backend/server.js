import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import userroutes from "./Routes/useroute.js";
import playerroutes from "./Routes/playeroute.js";
dotenv.config();


const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/user", userroutes);
app.use("/player", playerroutes);




const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
