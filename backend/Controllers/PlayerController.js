import { getPlayers } from '../Models/Player.js';

// Controller to fetch all players
export const getAllPlayers = async (req, res) => {
    try {
        const players = await getPlayers();
        
        // Validate the players data
        if (!Array.isArray(players)) {
            console.error("Error: Players data is not an array.");
            return res.status(500).json({ 
                message: "Failed to fetch players.", 
                error: "Invalid data format" 
            });
        }

        // Send the players data as a response
        return res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching players:", error.message, error.stack);
        return res.status(500).json({ 
            message: "Error fetching players", 
            error: error.message 
        });
    }
};