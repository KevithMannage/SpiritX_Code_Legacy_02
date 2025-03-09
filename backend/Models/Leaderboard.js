import pool from '../Config/db.js';

class Leaderboard {
    static async getLeaderBoard() {
        const query = `
            SELECT 
                u.Username,
                SUM(p.Total_Runs) AS TotalRuns,
                SUM(p.Balls_Faced) AS TotalBallsFaced,
                SUM(p.Innings_Played) AS TotalInningsPlayed,
                SUM(p.Wickets) AS TotalWickets,
                SUM(p.Overs_Bowled) AS TotalOversBowled,
                SUM(p.Runs_Conceded) AS TotalRunsConceded,
                COUNT(p.Player_ID) AS PlayerCount
            FROM 
                User u
            JOIN 
                Team_Members tm ON u.User_ID = tm.User_ID
            JOIN 
                Player p ON tm.Player_ID = p.Player_ID
            GROUP BY 
                u.User_ID, u.Username
            HAVING 
                COUNT(p.Player_ID) = 11;
        `;
        const [rows] = await pool.query(query);
        return rows;
    }
}

export default Leaderboard;