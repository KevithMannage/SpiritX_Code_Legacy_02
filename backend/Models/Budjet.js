import db from "../Config/db.js";

export const getPlayersByUserId = async (userId) => {
    try {
        const sql = `
            SELECT p.* FROM team t
            JOIN team_members tm ON t.Team_ID = tm.Team_ID
            JOIN player p ON tm.Player_ID = p.Player_ID
            WHERE t.User_ID = ?`;

            const [rows] = await db.execute(sql, [userId]);
         return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

