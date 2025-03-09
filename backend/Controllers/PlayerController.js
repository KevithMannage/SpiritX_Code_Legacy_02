import mysql from 'mysql2/promise';

// Debug logs to verify environment variables
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '[hidden]' : 'undefined');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('MYSQL_PORT:', process.env.MYSQL_PORT);

const getDbConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'Matheesha@11',
      database: process.env.MYSQL_DATABASE || 'spiritx_2',
      port: process.env.MYSQL_PORT || 3306,
    });
    console.log('Database connection established');
    return connection;
  } catch (err) {
    throw new Error(`Failed to connect to database: ${err.message}`);
  }
};

export const getPlayersByCategory = async (req, res) => {
  let db;
  try {
    const { category } = req.params;
    console.log('Fetching players for category:', category);
    db = await getDbConnection();
    const [players] = await db.query(
      `SELECT 
        Player_ID, 
        Name, 
        University, 
        Category, 
        Total_runs,
        Balls_Faced,
        Innings_played,
        Wickets,
        Overs_Bowled,
        Runs_Conceded
      FROM Player 
      WHERE Category = ?`,
      [category]
    );
    console.log('Players fetched:', players.length);
    res.json(players);
  } catch (err) {
    console.error('Error in getPlayersByCategory:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (db) await db.end();
    console.log('Database connection closed');
  }
};