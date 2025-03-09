import express from "express";

import {
  getPlayerCount,
  removePlayerFromTeam,
  getteambyuser,
  addPlayerToTeam,
  getMembers,
} from "../Controllers/Teamcontroller.js";

const router = express.Router();

router.get("/count/:userId", getPlayerCount);
router.delete("/removePlayerFromTeam", removePlayerFromTeam);
router.get("/getteambyuser/:userId", getteambyuser);
router.post("/addPlayerToTeam", addPlayerToTeam);
router.get("/getMembers/:teamId", getMembers);

export default router;