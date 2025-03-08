import db from '../config/db.js';

class PlayerModel {
  // Get all players
  static async getAllPlayers() {
    const [rows] = await db.query('SELECT * FROM Player');
    return rows;
  }

  // Create a new player
  static async createPlayer(playerData) {
    const { Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded } = playerData;
    const [result] = await db.query(
      'INSERT INTO Player (Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded]
    );
    return { Player_ID: result.insertId };
  }

  // Update a player
  static async updatePlayer(id, playerData) {
    const { Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded } = playerData;
    const [result] = await db.query(
      'UPDATE Player SET Name = ?, University = ?, Category = ?, Total_Runs = ?, Balls_Faced = ?, Innings_Played = ?, Wickets = ?, Overs_Bowled = ?, Runs_Conceded = ? WHERE Player_ID = ?',
      [Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded, id]
    );
    return result.affectedRows > 0;
  }

  // Delete a player
  static async deletePlayer(id) {
    const [result] = await db.query('DELETE FROM Player WHERE Player_ID = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default PlayerModel;