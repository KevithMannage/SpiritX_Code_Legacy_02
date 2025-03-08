import connectDB from '../Config/db.js';

export const getPlayers = async () => {
    try {
        // Query to select all players from the players table
        const query = 'SELECT * FROM player';

        // Execute the query and get the results
        const [rows] = await connectDB.execute(query);

        // Validate the query result
        if (!rows || !Array.isArray(rows)) {
            console.error("Error: Query result is not iterable or empty.");
            return [];  // Return an empty array if the result is invalid
        }

        return rows;  // Return the players
    } catch (error) {
        console.error("Error executing query:", error.message, error.stack);
        throw error;  // Re-throw the error to be handled by the controller
    }
};