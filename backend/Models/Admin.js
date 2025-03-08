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