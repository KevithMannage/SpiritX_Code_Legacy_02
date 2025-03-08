import React, { useState, useEffect } from 'react';

const TeamPage = () => {
  const [categories] = useState(['Batsman', 'All-rounder', 'Bowler']); // Categories list
  const [selectedCategory, setSelectedCategory] = useState('Batsman'); // Default selected category
  const [players, setPlayers] = useState([]); // List of players
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Selected player for details

  useEffect(() => {
    // Fetch players based on the selected category
    const fetchPlayersByCategory = async () => {
      try {
        const response = await fetch('http://localhost:3000/player/getplayerbycategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category: selectedCategory }), // Send category in the body
        });

        const data = await response.json();
        setPlayers(data); // Set the list of players for the selected category
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayersByCategory(); // Call the function to fetch players
  }, [selectedCategory]); // Re-run the fetch whenever the category changes

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Update the selected category
  };

  const handlePlayerSelection = (player) => {
    setSelectedPlayer(player); // Set the selected player for detailed view
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Team Page</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Select Category:</h2>
          <div className="flex space-x-4 mt-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-lg rounded-md ${
                  selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Players in {selectedCategory}</h2>
          <div className="space-y-4">
            {players.length > 0 ? (
              players.map((player) => (
                <div
                  key={player.Player_ID}
                  className="p-4 border rounded-lg bg-blue-50 cursor-pointer"
                  onClick={() => handlePlayerSelection(player)}
                >
                  <h3 className="text-xl font-bold text-blue-600">{player.Name}</h3>
                  <p className="text-gray-700">University: {player.University}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No players available in this category</p>
            )}
          </div>
        </div>

        {selectedPlayer && (
          <div className="mt-6 p-6 border rounded-lg bg-white shadow-md">
            <h3 className="text-2xl font-bold text-blue-600">Selected Player</h3>
            <p className="text-lg mt-2"><strong>Name:</strong> {selectedPlayer.Name}</p>
            <p className="text-lg"><strong>University:</strong> {selectedPlayer.University}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={() => alert('Player added to team')}
            >
              Add to Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
