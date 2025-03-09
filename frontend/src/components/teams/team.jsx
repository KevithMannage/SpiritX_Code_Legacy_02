import React, { useState, useEffect } from 'react';

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
  const userId = localStorage.getItem('userId') || '1';

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

  const isPlayerInTeam = (playerId) => {
    return team.some((teamPlayer) => teamPlayer.Player_ID === playerId);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Select Your Team</h1>

      <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold">Team Status</h2>
        <p>Remaining Budget: Rs. {budget.remaining.toLocaleString()}</p>
        <p>Spent: Rs. {budget.spent.toLocaleString()}</p>
        <p>Players Selected: {team.length}/11</p>
        {team.length >= 11 && (
          <p className="text-red-500 mt-2">Team complete! Maximum 11 players reached.</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          <option value="Batsman">Batsman</option>
          <option value="All-Rounder">All-Rounder</option>
          <option value="Bowler">Bowler</option>
        </select>
        <button
          onClick={loadPlayers}
          className={`mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load Players'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {players.map((player) => {
          const isAdded = isPlayerInTeam(player.Player_ID);
          return (
            <div key={player.Player_ID} className="p-4 bg-white rounded-lg shadow">
              <p className="font-medium">{player.Name} ({player.University})</p>
              <p>Value: Rs. {player.Value.toLocaleString()}</p>
              <button
                onClick={() => !isAdded && addPlayer(player.Player_ID, player.Value)}
                className={`mt-2 w-full px-4 py-2 text-white rounded ${
                  isAdded
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                } ${loading || team.length >= 11 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading || team.length >= 11 || isAdded}
              >
                {isAdded ? 'Player Added' : 'Add to Team'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Team</h2>
        {team.length === 0 ? (
          <p className="text-gray-500">No players selected yet.</p>
        ) : (
          <div className="space-y-2">
            {team.map((player) => (
              <div
                key={player.Player_ID}
                className="flex justify-between items-center p-2 bg-gray-100 rounded"
              >
                <span>
                  {player.Name} ({player.University}) - Rs.{' '}
                  {player.Purchased_Price.toLocaleString()}
                </span>
                <button
                  onClick={() => removePlayer(player.Player_ID)}
                  className={`px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ${
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
  );
};

export default SelectYourTeam;