// import { getPlayers,getPlayersByCategory } from '../Models/Player.js';




//  export const fetchPlayers = async (req, res) => {
//   const { category } = req.body;  // Get category from query params

//   // Check if category is provided
//   if (!category) {
//     return res.status(400).json({ message: 'Category is required' });
//   }

//   try {
//     // Call the model function to fetch players by category
//     const players = await getPlayersByCategory(category);

//     // If no players are found, return a 404 response
//     if (players.length === 0) {
//       return res.status(404).json({ message: 'No players found for this category' });
//     }

//     // Send the fetched players data as a response
//     res.json(players);
//   } catch (error) {
//     console.error('Error fetching players:', error);
//     res.status(500).json({ message: 'An error occurred while fetching players' });
//   }
// };




// // Controller to fetch all players
// export const getAllPlayers = async (req, res) => {
//     try {
//         const players = await getPlayers();
        
//         // Validate the players data
//         if (!Array.isArray(players)) {
//             console.error("Error: Players data is not an array.");
//             return res.status(500).json({ 
//                 message: "Failed to fetch players.", 
//                 error: "Invalid data format" 
//             });
//         }

//         // Send the players data as a response
//         return res.status(200).json(players);
//     } catch (error) {
//         console.error("Error fetching players:", error.message, error.stack);
//         return res.status(500).json({ 
//             message: "Error fetching players", 
//             error: error.message 
//         });
//     }
// };

import { getPlayers,getPlayersByCategory } from '../Models/Player.js';




 export const fetchPlayers = async (req, res) => {
  const { category } = req.body;  // Get category from query params

  // Check if category is provided
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    // Call the model function to fetch players by category
    const players = await getPlayersByCategory(category);

    // If no players are found, return a 404 response
    if (players.length === 0) {
      return res.status(404).json({ message: 'No players found for this category' });
    }

    // Send the fetched players data as a response
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ message: 'An error occurred while fetching players' });
  }
};




// Controller to fetch all players
export const getAllPlayers = async (req, res) => {
    try {
        const players = await getPlayers();
        
        // Validate the players data
        if (!Array.isArray(players)) {
            console.error("Error: Players data is not an array.");
            return res.status(500).json({ 
                message: "Failed to fetch players.", 
                error: "Invalid data format" 
            });
        }

        // Send the players data as a response
        return res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching players:", error.message, error.stack);
        return res.status(500).json({ 
            message: "Error fetching players", 
            error: error.message 
        });
    }
};