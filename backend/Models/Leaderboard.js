import pool from '../Config/db.js'

class Leaderboard {
    static async getLeaderBoard() {
        const [rows] = await pool.query('SELECT Username,SUM(Total_Runs) AS TotalRuns,SUM(Balls_Faced) AS TotalBallsFaced,SUM(Innings_Played) AS TotalInningsPlayed,SUM(Overs_Bowled) AS TotalOversBowled,SUM(Runs_Conceded) AS TotalRunsConceded FROM usernameandpoints GROUP BY Username')
        return rows;
    }
}
export default Leaderboard;