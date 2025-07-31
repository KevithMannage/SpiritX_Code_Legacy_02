import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Base URL without /api

// Function to calculate player stats based on handbook formulas
const calculateStats = (player) => {
  const battingStrikeRate = player.Balls_Faced > 0 ? (player.Total_Runs / player.Balls_Faced) * 100 : 0;
  const battingAverage = player.Innings_Played > 0 ? player.Total_Runs / player.Innings_Played : 0;
  const totalBallsBowled = player.Overs_Bowled * 6; // Convert overs to balls
  const bowlingStrikeRate = player.Wickets > 0 ? totalBallsBowled / player.Wickets : 0;
  const economyRate = totalBallsBowled > 0 ? (player.Runs_Conceded / totalBallsBowled) * 6 : 0;

  const points =
    (battingStrikeRate / 5 + battingAverage * 0.8) +
    (bowlingStrikeRate > 0 ? 500 / bowlingStrikeRate : 0) +
    (economyRate > 0 ? 140 / economyRate : 0);

  const valueRaw = (9 * points + 100) * 1000;
  const value = Math.round(valueRaw / 50000) * 50000;

  return {
    ...player, // Keep original player data
    Value: value, // Add calculated Value for frontend use
  };
};

const SelectYourTeam = () => {
  const [category, setCategory] = useState('Batsman');
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const [budget, setBudget] = useState({ remaining: 9000000, spent: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = localStorage.getItem('userId') || '1';
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeam();
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const response = await fetch(`${API_URL}/team/budget?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch budget');
      const data = await response.json();
      setBudget(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch(`${API_URL}/team?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch team');
      const data = await response.json();
      setTeam(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadPlayers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/play/${category}`);
      if (!response.ok) throw new Error('Failed to load players');
      const rawPlayers = await response.json();
      // Map database keys to expected keys for calculateStats
      const mappedPlayers = rawPlayers.map((player) => ({
        ...player,
        Total_Runs: player.Total_runs,
        Innings_Played: player.Innings_played,
      }));
      // Calculate stats for each player
      const playersWithStats = mappedPlayers.map((player) => calculateStats(player));
      setPlayers(playersWithStats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPlayer = async (playerId, purchasedPrice) => {
    if (team.length >= 11) {
      setError('Team is already complete (maximum 11 players)');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/team/add-player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, playerId, purchasedPrice }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add player');
      await Promise.all([fetchTeam(), fetchBudget()]);
      alert(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removePlayer = async (playerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/team/remove-player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, playerId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to remove player');
      await Promise.all([fetchTeam(), fetchBudget()]);
      alert(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isPlayerInTeam = (playerId) => {
    return team.some((teamPlayer) => teamPlayer.Player_ID === playerId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
  
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-blue-900">
          <h1 className="text-4xl font-bold text-blue-400 mb-6">Select Your Team</h1>

          <div className="mb-6 p-6 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">Team Status</h2>
            <p className="text-gray-300">Remaining Budget: Rs. {budget.remaining.toLocaleString()}</p>
            <p className="text-gray-300">Spent: Rs. {budget.spent.toLocaleString()}</p>
            <p className="text-gray-300">Players Selected: {team.length}/11</p>
            {team.length >= 11 && (
              <p className="text-red-500 mt-2">Team complete! Maximum 11 players reached.</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-300 mb-2">Select Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              disabled={loading}
            >
              <option value="Batsman">Batsman</option>
              <option value="All-Rounder">All-Rounder</option>
              <option value="Bowler">Bowler</option>
            </select>
            <button
              onClick={loadPlayers}
              className={`mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load Players'}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900 text-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {players.map((player) => {
              const isAdded = isPlayerInTeam(player.Player_ID);
              return (
                <div key={player.Player_ID} className="p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <p className="font-medium text-blue-400">{player.Name} ({player.University})</p>
                  <p className="text-gray-300">Value: Rs. {player.Value.toLocaleString()}</p>
                  <button
                    onClick={() => !isAdded && addPlayer(player.Player_ID, player.Value)}
                    className={`mt-2 w-full px-4 py-2 text-white rounded-lg transition duration-300 ${
                      isAdded
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    } ${loading || team.length >= 11 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading || team.length >= 11 || isAdded}
                  >
                    {isAdded ? 'Player Added' : 'Add to Team'}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Your Team</h2>
            {team.length === 0 ? (
              <p className="text-gray-300">No players selected yet.</p>
            ) : (
              <div className="space-y-2">
                {team.map((player) => (
                  <div
                    key={player.Player_ID}
                    className="flex justify-between items-center p-2 bg-gray-600 rounded-lg"
                  >
                    <span className="text-gray-300">
                      {player.Name} ({player.University}) - Rs.{' '}
                      {player.Purchased_Price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => removePlayer(player.Player_ID)}
                      className={`px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-blue-900 to-black text-white p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Cricket Players Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SelectYourTeam;