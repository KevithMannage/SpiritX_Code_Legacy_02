import Leaderboard from "../Models/Leaderboard.js";

class LeaderboardController {
    static async getLeaderboard(req, res) {
        try {
            const leaderboard = await Leaderboard.getLeaderBoard();

            const responseData = {
                success: true,
                data: {
                    leaderboard
                }
            };
            const io = req.app.get('socketio');
            io.emit('leaderboardUpdated', responseData.data);

            res.json(responseData);
        } catch (error) {
            console.error("Error fetching leaderboard: ", error);
            res.status(500).json({
                success: false,
                message: "Error fetching leaderboard",
                error: error.message
            });
        }
    }
}
export default LeaderboardController;