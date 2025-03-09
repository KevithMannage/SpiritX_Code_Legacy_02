import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const getDbConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

export class Player {
  static async getPlayersByCategory(category) {
    const db = await getDbConnection();
    try {
      const [results] = await db.query(
        `SELECT 
          Player_ID, 
          Name, 
          University, 
          Category, 
          Total_Runs, 
          Balls_Faced, 
          Innings_Played, 
          Wickets, 
          Overs_Bowled, 
          Runs_Conceded 
        FROM Player 
        WHERE Category = ?`,
        [category]
      );
      return results;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }
}