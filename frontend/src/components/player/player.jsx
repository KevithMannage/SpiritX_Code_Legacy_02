import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/players';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortField, setSortField] = useState('Name');
  const [sortOrder, setSortOrder] = useState('asc');

  const userId = localStorage.getItem('userId');
  const isAuthenticated = !!userId;

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
      setFilteredPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...players];
    if (searchTerm) {
      result = result.filter(
        (player) =>
          player.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.University.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter !== 'All') {
      result = result.filter((player) => player.Category === categoryFilter);
    }
    result.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (typeof fieldA === 'string') {
        return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }
      return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    });
    setFilteredPlayers(result);
  }, [searchTerm, categoryFilter, sortField, sortOrder, players]);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const closeDetailedView = () => {
    setSelectedPlayer(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Cricket Players Dashboard</h1>
          <p className="text-red-500 text-lg">Please log in to view players.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="container mx-auto p-6">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or university..."
            className="p-2 border rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
          </select>
          <select
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="Name">Sort by Name</option>
            <option value="Total_Runs">Sort by Runs</option>
            <option value="Wickets">Sort by Wickets</option>
            <option value="Innings_Played">Sort by Innings</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
          </button>
        </div>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading players...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {!loading && !error && filteredPlayers.length === 0 && (
          <p className="text-center text-gray-600">No players found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <div
              key={player.Player_ID}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handlePlayerClick(player)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{player.Name}</h3>
              <p className="text-gray-600">{player.University}</p>
              <p className="text-sm text-blue-500">{player.Category}</p>
              <div className="mt-4 flex justify-between">
                <span>Runs: {player.Total_Runs}</span>
                <span>Wickets: {player.Wickets}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedPlayer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedPlayer.Name}</h2>
              <div className="space-y-2">
                <p><strong>University:</strong> {selectedPlayer.University}</p>
                <p><strong>Category:</strong> {selectedPlayer.Category}</p>
                <h3 className="text-lg font-semibold mt-4">Statistics</h3>
                <p><strong>Total Runs:</strong> {selectedPlayer.Total_Runs}</p>
                <p><strong>Balls Faced:</strong> {selectedPlayer.Balls_Faced}</p>
                <p><strong>Innings Played:</strong> {selectedPlayer.Innings_Played}</p>
                <p><strong>Wickets:</strong> {selectedPlayer.Wickets}</p>
                <p><strong>Overs Bowled:</strong> {selectedPlayer.Overs_Bowled}</p>
                <p><strong>Runs Conceded:</strong> {selectedPlayer.Runs_Conceded}</p>
              </div>
              <button
                onClick={closeDetailedView}
                className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Cricket Players Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Players;