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

  static async getTopRunScorers() {
    const [rows] = await db.query('SELECT Name, Total_Runs FROM Player ORDER BY Total_Runs DESC LIMIT 1');
    return rows;
  }

  static async getTopWicketTakers() {
    const [rows] = await db.query('SELECT Name, Wickets FROM Player ORDER BY Wickets DESC LIMIT 1');
    return rows;
  }

  static async getTotalRunsAndWickets() {
    const [rows] = await db.query('SELECT SUM(Total_Runs) as TotalRuns,SUM(Wickets) as TotalWickets FROM player')
    return rows;
  }
  static async checkForUpdates(io) {
    setInterval(async () => {
      try {
        const topRunScorers = await this.getTopRunScorers();
        const topWicketTakers = await this.getTopWicketTakers();
        const totalRunsAndWickets = await this.getTotalRunsAndWickets();

        const data = {
          topRunScorers,
          topWicketTakers,
          totalRunsAndWickets
        };

        io.emit('topPerformersUpdated', data); // Emit to all clients
      } catch (error) {
        console.error('Error in update check:', error);
      }
    }, 1000); // Check every 5 seconds
  }
}

export default PlayerModel;