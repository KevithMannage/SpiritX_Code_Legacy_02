// leaderboardController.js
const db = require("../config/db.js");

// Helper function to calculate player points based on the provided logic
const calculatePlayerPoints = (player) => {
    // Batting Strike Rate = (Total Runs / Total Balls Faced) * 100
    const battingStrikeRate = (player.Total_Runs / player.Balls_Faced) * 100;

    // Batting Average = Total Runs / Innings Played
    const battingAverage = player.Total_Runs / player.Innings_Played;

    // Bowling Strike Rate = Total Balls Bowled / Total Wickets Taken
    const bowlingStrikeRate = (player.Wickets === 0) ? 0 : (player.Overs_Bowled * 6) / player.Wickets;

    // Economy Rate = (Total Runs Conceded / Total Balls Bowled) * 6
    const totalBallsBowled = player.Overs_Bowled * 6;
    const economyRate = (totalBallsBowled === 0) ? 0 : (player.Runs_Conceded / totalBallsBowled) * 6;

    // Player Points = (Batting Strike Rate / 5 + Batting Average * 0.8) + (500 / Bowling Strike Rate + 140 / Economy Rate)
    const battingPoints = (battingStrikeRate / 5) + (battingAverage * 0.8);
    const bowlingPoints = (bowlingStrikeRate === 0 ? 0 : 500 / bowlingStrikeRate) + (economyRate === 0 ? 0 : 140 / economyRate);

    return battingPoints + bowlingPoints;
};

// Controller to get the leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const loggedInUserId = req.user.User_ID; // Assuming user is authenticated and user ID is available in req.user

        // Step 1: Get all teams with exactly 11 players
        const teamsQuery = `
            SELECT t.Team_ID, t.User_ID, u.Username, COUNT(tm.Player_ID) as PlayerCount
            FROM Team t
            JOIN User u ON t.User_ID = u.User_ID
            LEFT JOIN Team_Members tm ON t.Team_ID = tm.Team_ID
            GROUP BY t.Team_ID
            HAVING PlayerCount = 11;
        `;
        const [teams] = await db.query(teamsQuery);

        if (teams.length === 0) {
            return res.status(200).json({ leaderboard: [] });
        }

        // Step 2: Calculate points for each team
        const leaderboard = [];
        for (const team of teams) {
            // Get all players in the team
            const playersQuery = `
                SELECT p.*
                FROM Player p
                JOIN Team_Members tm ON p.Player_ID = tm.Player_ID
                WHERE tm.Team_ID = ?;
            `;
            const [players] = await db.query(playersQuery, [team.Team_ID]);

            // Calculate total points for the team
            let totalPoints = 0;
            for (const player of players) {
                const points = calculatePlayerPoints(player);
                totalPoints += points;
            }

            leaderboard.push({
                username: team.Username,
                points: totalPoints,
                isCurrentUser: team.User_ID === loggedInUserId
            });
        }

        // Step 3: Sort by points in descending order
        leaderboard.sort((a, b) => b.points - a.points);

        res.status(200).json({ leaderboard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching leaderboard" });
    }
};