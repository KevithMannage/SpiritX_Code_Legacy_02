// import connectDB from '../Config/db.js';

// export const getPlayersByCategory = async (category) => {
//     try {
//       // SQL query to get players by category
//       const query = 'SELECT * FROM player WHERE Category = ?';
      
//       // Execute the query with the provided category
//       const [rows] = await connectDB.execute(query, [category]);
  
//       // Return the fetched players data
//       return rows;
//     } catch (err) {
//       // If any error occurs, log it and return a message
//       console.error('Error fetching players:', err);
//       throw new Error('Could not fetch players');
//     }
//   };


// export const getPlayers = async () => {
//     try {
//         // Query to select all players from the players table
//         const query = 'SELECT * FROM player';

//         // Execute the query and get the results
//         const [rows] = await connectDB.execute(query);

//         // Validate the query result
//         if (!rows || !Array.isArray(rows)) {
//             console.error("Error: Query result is not iterable or empty.");
//             return [];  // Return an empty array if the result is invalid
//         }

//         return rows;  // Return the players
//     } catch (error) {
//         console.error("Error executing query:", error.message, error.stack);
//         throw error;  // Re-throw the error to be handled by the controller
//     }
// };
import connectDB from '../Config/db.js';

export const getPlayersByCategory = async (category) => {
    try {
      // SQL query to get players by category
      const query = 'SELECT * FROM player WHERE Category = ?';
      
      // Execute the query with the provided category
      const [rows] = await connectDB.execute(query, [category]);
  
      // Return the fetched players data
      return rows;
    } catch (err) {
      // If any error occurs, log it and return a message
      console.error('Error fetching players:', err);
      throw new Error('Could not fetch players');
    }
  };


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