import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/players'; // API endpoint for fetching players

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedTab, setSelectedTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate authentication check (assuming userId is stored in localStorage after login)
  const userId = localStorage.getItem('userId');
  const isAuthenticated = !!userId; // Simple check for demo; adjust based on your auth system

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlayers();
    }
  }, [isAuthenticated]);

  const fetchPlayers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch players');
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const closeDetailedView = () => {
    setSelectedPlayer(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Players</h1>
        <p className="text-red-500 text-center">Please log in to view players.</p>
      </div>
    );
  }

 const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "team") {
      navigate(`/team/${userId}`);
    } else if (tab === "team-details") {
      navigate(`/team-details/${userId}`);
    } else if (tab === "leaderboard") {
      navigate(`/leaderboard/${userId}`);
    } else {
      navigate(`/${tab}`);
    }
  };

    const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };



  return (
    <>
    {/* Navbar Component */}
     
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Players</h1>

      {loading && (
        <p className="text-center text-gray-500">Loading players...</p>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}

      {!loading && !error && players.length === 0 && (
        <p className="text-center text-gray-500">No players available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {players.map((player) => (
          <div
            key={player.Player_ID}
            className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
            onClick={() => handlePlayerClick(player)}
          >
            <p className="font-medium">{player.Name}</p>
            <p>{player.University}</p>
            <p className="text-sm text-gray-600">{player.Category}</p>
          </div>
        ))}
      </div>

      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">{selectedPlayer.Name}</h2>
            <p><strong>University:</strong> {selectedPlayer.University}</p>
            <p><strong>Category:</strong> {selectedPlayer.Category}</p>
            <h3 className="text-lg font-medium mt-4 mb-2">Statistics</h3>
            <p><strong>Total Runs:</strong> {selectedPlayer.Total_Runs}</p>
            <p><strong>Balls Faced:</strong> {selectedPlayer.Balls_Faced}</p>
            <p><strong>Innings Played:</strong> {selectedPlayer.Innings_Played}</p>
            <p><strong>Wickets:</strong> {selectedPlayer.Wickets}</p>
            <p><strong>Overs Bowled:</strong> {selectedPlayer.Overs_Bowled}</p>
            <p><strong>Runs Conceded:</strong> {selectedPlayer.Runs_Conceded}</p>
            <button
              onClick={closeDetailedView}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Players;