import db from "../Config/db.js";

export const getPlayersByUserId = async (userId) => {
    try {
        const sql = `
            SELECT 
    p.Player_ID,
    p.Name,
    p.University,
    p.Category,
    p.Total_Runs,
    p.Balls_Faced,
    p.Innings_Played,
    p.Wickets,
    p.Overs_Bowled,
    p.Runs_Conceded,
    p.Created_at,
    p.Updated_at,
    tm.Budget
FROM 
    team_members tm
JOIN 
    player p ON tm.Player_ID = p.Player_ID
WHERE 
    tm.Team_ID = ?`;

            const [rows] = await db.execute(sql, [userId]);
         return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};