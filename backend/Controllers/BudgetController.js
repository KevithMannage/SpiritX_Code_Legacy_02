import { getPlayersByUserId } from "../Models/Budjet.js";

export const getPlayersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await getPlayersByUserId(userId);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
