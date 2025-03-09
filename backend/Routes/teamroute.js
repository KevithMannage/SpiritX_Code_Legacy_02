import express from "express";

import {
  getPlayerCount,
  removePlayerFromTeam,
  getteambyuser,
  addPlayerToTeam,
  getMembers,
  getTeamMembers,
} from "../Controllers/Teamcontroller.js";

const router = express.Router();

router.get("/count/:userId", getPlayerCount);
router.delete(
  "/removePlayerFromTeam/:Team_ID/:Player_ID",
  removePlayerFromTeam
);
router.get("/getteambyuser/:userId", getteambyuser);
router.post("/addPlayerToTeam", addPlayerToTeam);
router.get("/getMembers/:teamId", getMembers);
router.get("/getTeamMembers/:teamId", getTeamMembers);

export default router;
