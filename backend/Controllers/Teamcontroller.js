// // controllers/teamController.js

// import {countPlayersInTeam,addPlayerToTeam,removePlayerFromTeam}  from '../Models/Team.js';
// const teamModel = require('../Models/Team');

// // Add a player to the user's team
// const addPlayerToTeam = async (req, res) => {
//     const { User_ID, Player_ID } = req.body;

//     // Validate input
//     if (!User_ID || !Player_ID) {
//         return res.status(400).json({ error: 'User ID and Player ID are required' });
//     }

//     // Add player to team
//     teamModel.addPlayerToTeam(User_ID, Player_ID, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.status(201).json({ message: 'Player added to team', result });
//     });
// };

// // Remove a player from the user's team
// const removePlayerFromTeam = async (req, res) => {
//     const { User_ID, Player_ID } = req.params;

//     // Validate input
//     if (!User_ID || !Player_ID) {
//         return res.status(400).json({ error: 'User ID and Player ID are required' });
//     }

//     // Remove player from team
//     teamModel.removePlayerFromTeam(User_ID, Player_ID, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.status(200).json({ message: 'Player removed from team', result });
//     });
// };

// // Get all players in a user's team
// const getTeamPlayers = async (req, res) => {
//     const { User_ID } = req.params;

//     // Validate input
//     if (!User_ID) {
//         return res.status(400).json({ error: 'User ID is required' });
//     }

//     // Fetch team players
//     teamModel.getTeamPlayers(User_ID, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.status(200).json({ team: result });
//     });
// };

// module.exports = {
//     addPlayerToTeam,
//     removePlayerFromTeam,
//     getTeamPlayers,
// };

import {
  countPlayersInTeam,
  addPlayer_to_team,
  removePlayer_from_team,
  getteamidbyuser,
} from "../Models/Team.js";

// Get the count of players in a user's team
export const getPlayerCount = async (req, res) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Call the countPlayersInTeam function and await its result
    const count = await countPlayersInTeam(userId);

    // Send success response
    res.json({ playerCount: count });
  } catch (err) {
    // Handle errors and send appropriate response
    console.error("Error getting player count:", err);
    res
      .status(500)
      .json({ error: "Failed to get player count", details: err.message });
  }
};

// Add a player to the team
export const addPlayerToTeam = async (req, res) => {
  const { Team_ID, Player_ID } = req.body;
  console.log("Request received:", { Team_ID, Player_ID });

  // Validate input
  if (!Team_ID || !Player_ID) {
    return res
      .status(400)
      .json({ error: "Team ID and Player ID are required" });
  }

  try {
    const result = await addPlayer_to_team(Team_ID, Player_ID);
    console.log("Player added successfully:", result);
    res.status(201).json({ message: "Player added successfully", result });
  } catch (err) {
    console.error("Error adding player:", err);
    res.status(500).json({ error: err.message });
  }
};

// Remove a player from the team
export const removePlayerFromTeam = async (req, res) => {
  const { Team_ID, playerId } = req.body;

  // Validate input
  if (!Team_ID || !playerId) {
    return res
      .status(400)
      .json({ error: "Team ID and Player ID are required" });
  }

  try {
    // Call the removePlayerFromTeam function and await its result
    const result = await removePlayer_from_team(Team_ID, playerId);

    // Send success response
    res.json({ message: "Player removed successfully", result });
  } catch (err) {
    // Handle errors and send appropriate response
    console.error("Error removing player:", err);
    res
      .status(500)
      .json({ error: "Failed to remove player", details: err.message });
  }
};

export const getteambyuser = async (req, res) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Call the countPlayersInTeam function and await its result
    const teamid = await getteamidbyuser(userId);

    // Send success response
    res.json({ Team_ID: teamid });
  } catch (err) {
    // Handle errors and send appropriate response
    console.error("Error getting Team ID from Team Table :", err);
    res
      .status(500)
      .json({ error: "Failed to get Team ID", details: err.message });
  }
};
