import db from '../Config/db.js';

// Count the number of players in a user's team
// export const countPlayersInTeam = (User_ID, callback) => {
//     const query = 'SELECT COUNT(*) AS player_count FROM teams WHERE User_ID = ?';
//     db.query(query, [User_ID], (err, result) => {
//         if (err) return callback(err.message, null);
//         callback(null, result[0].player_count);
//     });
// };
export const countPlayersInTeam = async (userId) => {
    const query = 'SELECT COUNT(*) AS player_count FROM teams WHERE User_ID = ?';

    try {
        const [result] = await db.query(query, [userId]);
        return result[0].player_count; // Return the player count
    } catch (err) {
        console.error('Error counting players in team:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
};
// Add a player to the user's team


import { execute } from '../Config/db.js'; // Adjust the path as needed

// export const addPlayerToTeam = async (User_ID, Player_ID) => {
//     console.log('Adding player:', { User_ID, Player_ID });

//     const insertQuery = 'INSERT INTO teams (User_ID, Player_ID) VALUES (?, ?)';

//     try {
//         const result = await execute(insertQuery, [User_ID, Player_ID]);
//         console.log('Player added successfully:', result);
//         return result; // Return the result for further use
//     } catch (err) {
//         console.error('Database error:', err);
//         throw err; // Throw the error to be handled by the caller
//     }
// };

 export const addPlayerToTeam = async (User_ID, Player_ID) => {
    console.log('Adding player:', { User_ID, Player_ID });

    // Step 1: Check the current number of players in the user's team
    const countQuery = 'SELECT COUNT(*) AS player_count FROM teams WHERE User_ID = ?';
    try {
        // Execute the query and handle the result appropriately
        const countResult = await execute(countQuery, [User_ID]);
        console.log('Query Result:', countResult); // Log the query result for debugging

        // Access player_count directly from countResult
        const playerCount = countResult.player_count;

        // Step 2: Validate the player count
        if (playerCount >= 11) {
            throw new Error('Maximum of 11 players allowed in a team');
        }

        // Step 3: Insert the new player if the count is less than 11
        const insertQuery = 'INSERT INTO teams (User_ID, Player_ID) VALUES (?, ?)';
        const insertResult = await execute(insertQuery, [User_ID, Player_ID]);
        console.log('Player added successfully:', insertResult);
        return insertResult; // Return the result for further use
    } catch (err) {
        console.error('Database error:', err);
        throw err; // Throw the error to be handled by the caller
    }
};
// Remove a player from the user's team
export const removePlayerFromTeam = async (User_ID, Player_ID) => {
    // Check if the player exists before attempting deletion
    const checkQuery = 'SELECT * FROM teams WHERE User_ID = ? AND Player_ID = ?';
    const deleteQuery = 'DELETE FROM teams WHERE User_ID = ? AND Player_ID = ?';

    try {
        // Step 1: Check if the player exists in the team
        const [checkResult] = await db.query(checkQuery, [User_ID, Player_ID]);

        if (checkResult.length === 0) {
            throw new Error('Player not found in team');
        }

        // Step 2: Delete the player
        const [deleteResult] = await db.query(deleteQuery, [User_ID, Player_ID]);

        // Return the result of the deletion
        return deleteResult;
    } catch (err) {
        console.error('Error in removePlayerFromTeam:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
};
// Get all players in a user's team
export const getTeamPlayers = (User_ID, callback) => {
    const query = `
        SELECT Player.Player_ID, Player.Name, Player.University 
        FROM Teams 
        JOIN Player ON Teams.Player_ID = Player.Player_ID
        WHERE Teams.User_ID = ?
    `;
    db.query(query, [User_ID], (err, result) => {
        if (err) return callback(err.message, null);
        callback(null, result);
    });
};
