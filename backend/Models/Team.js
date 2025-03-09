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

export class Team {
  static async getTeamMembers(userId) {
    const db = await getDbConnection();
    try {
      const [results] = await db.query(
        'SELECT p.Player_ID, p.Name, p.University, p.Category, tm.Purchased_Price FROM Team_Members tm JOIN Player p ON tm.Player_ID = p.Player_ID WHERE tm.User_ID = ?',
        [userId]
      );
      return results;
    } finally {
      await db.end();
    }
  }

  static async addPlayerToTeam(userId, playerId, purchasedPrice) {
    const db = await getDbConnection();
    try {
      const [result] = await db.query(
        'INSERT INTO Team_Members (User_ID, Player_ID, Purchased_Price) VALUES (?, ?, ?)',
        [userId, playerId, purchasedPrice]
      );
      return result;
    } finally {
      await db.end();
    }
  }

  static async removePlayerFromTeam(userId, playerId) {
    const db = await getDbConnection();
    try {
      const [result] = await db.query(
        'DELETE FROM Team_Members WHERE User_ID = ? AND Player_ID = ?',
        [userId, playerId]
      );
      return result;
    } finally {
      await db.end();
    }
  }

  static async getBudgetInfo(userId) {
    const db = await getDbConnection();
    try {
      const [[{ spent }]] = await db.query(
        'SELECT SUM(Purchased_Price) as spent FROM Team_Members WHERE User_ID = ?',
        [userId]
      );
      const spentValue = spent || 0;
      const initialBudget = 9000000;
      return { spent: spentValue, remaining: initialBudget - spentValue };
    } finally {
      await db.end();
    }
  }
}