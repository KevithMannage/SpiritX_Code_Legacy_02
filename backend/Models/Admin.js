import pool from '../Config/db.js';

class PlayerModel {
  static async getAllPlayers() {
    const [rows] = await pool.query('SELECT * FROM Player');
    return rows;
  }

  static async createPlayer(playerData) {
    const [result] = await pool.query(
      'INSERT INTO Player (Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        playerData.Name,
        playerData.University,
        playerData.Category,
        playerData.Total_Runs,
        playerData.Balls_Faced,
        playerData.Innings_Played,
        playerData.Wickets,
        playerData.Overs_Bowled,
        playerData.Runs_Conceded,
      ]
    );
    return { Player_ID: result.insertId };
  }

  static async updatePlayer(id, playerData) {
    const [result] = await pool.query(
      'UPDATE Player SET Name = ?, University = ?, Category = ?, Total_Runs = ?, Balls_Faced = ?, Innings_Played = ?, Wickets = ?, Overs_Bowled = ?, Runs_Conceded = ? WHERE Player_ID = ?',
      [
        playerData.Name,
        playerData.University,
        playerData.Category,
        playerData.Total_Runs,
        playerData.Balls_Faced,
        playerData.Innings_Played,
        playerData.Wickets,
        playerData.Overs_Bowled,
        playerData.Runs_Conceded,
        id,
      ]
    );
    return result.affectedRows > 0;
  }

  static async deletePlayer(id) {
    try {
      const [result] = await pool.query('DELETE FROM Player WHERE Player_ID = ?', [id]);
      console.log('Delete query result:', result);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deletePlayer query:', error);
      if (error.code === 'ER_ROW_IS_REFERENCED') {
        throw new Error('Cannot delete player because it is referenced in another table.');
      }
      throw error; // Re-throw other errors
    }
  }
}

export default PlayerModel;