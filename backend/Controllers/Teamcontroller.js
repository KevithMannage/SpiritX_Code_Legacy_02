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

export const getTeam = async (req, res) => {
  let db;
  try {
    const userId = req.query.userId;
    db = await getDbConnection();
    const [team] = await db.query(
      'SELECT p.Player_ID, p.Name, p.University, p.Category, tm.Purchased_Price FROM Team_Members tm JOIN Player p ON tm.Player_ID = p.Player_ID WHERE tm.User_ID = ?',
      [userId]
    );
    res.json(team);
  } catch (err) {
    console.error('Error in getTeam:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (db) await db.end();
  }
};

export const addPlayer = async (req, res) => {
  let db;
  try {
    const { userId, playerId, purchasedPrice } = req.body;
    db = await getDbConnection();

    // Check team size
    const [team] = await db.query(
      'SELECT COUNT(*) as count FROM Team_Members WHERE User_ID = ?',
      [userId]
    );
    if (team[0].count >= 11) {
      return res.status(400).json({ error: 'Team is already complete (11 players)' });
    }

    // Check for duplicate player
    const [duplicate] = await db.query(
      'SELECT Player_ID FROM Team_Members WHERE User_ID = ? AND Player_ID = ?',
      [userId, playerId]
    );
    if (duplicate.length > 0) {
      return res.status(400).json({ error: 'Player already in team' });
    }

    // Check budget
    const [[budget]] = await db.query(
      'SELECT COALESCE(SUM(Purchased_Price), 0) as spent FROM Team_Members WHERE User_ID = ?',
      [userId]
    );
    const spent = budget.spent || 0;
    const initialBudget = 9000000;
    const remaining = initialBudget - spent;
    if (remaining < purchasedPrice) {
      return res.status(400).json({ error: 'Insufficient budget' });
    }

    // Add player
    await db.query(
      'INSERT INTO Team_Members (User_ID, Player_ID, Purchased_Price) VALUES (?, ?, ?)',
      [userId, playerId, purchasedPrice]
    );
    res.json({ message: 'Player added successfully' });
  } catch (err) {
    console.error('Error in addPlayer:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (db) await db.end();
  }
};

export const removePlayer = async (req, res) => {
  let db;
  try {
    const { userId, playerId } = req.body;
    db = await getDbConnection();
    const [result] = await db.query(
      'DELETE FROM Team_Members WHERE User_ID = ? AND Player_ID = ?',
      [userId, playerId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Player not found in team' });
    }
    res.json({ message: 'Player removed successfully' });
  } catch (err) {
    console.error('Error in removePlayer:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (db) await db.end();
  }
};

export const getBudget = async (req, res) => {
  let db;
  try {
    const userId = req.query.userId;
    db = await getDbConnection();
    const [[budget]] = await db.query(
      'SELECT COALESCE(SUM(Purchased_Price), 0) as spent FROM Team_Members WHERE User_ID = ?',
      [userId]
    );
    const spent = budget.spent || 0;
    const initialBudget = 9000000;
    res.json({ spent, remaining: initialBudget - spent });
  } catch (err) {
    console.error('Error in getBudget:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (db) await db.end();
  }
};