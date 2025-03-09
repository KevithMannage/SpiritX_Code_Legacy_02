import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000'; // Base API URL

// Function to calculate player points based on handbook logic
const calculatePlayerPoints = (player) => {
  const battingStrikeRate = player.Balls_Faced > 0 ? (player.Total_Runs / player.Balls_Faced) * 100 : 0;
  const battingAverage = player.Innings_Played > 0 ? player.Total_Runs / player.Innings_Played : 0;
  const totalBallsBowled = player.Overs_Bowled * 6;
  const bowlingStrikeRate = player.Wickets > 0 ? totalBallsBowled / player.Wickets : 0;
  const economyRate = totalBallsBowled > 0 ? (player.Runs_Conceded / totalBallsBowled) * 6 : 0;

  const points =
    (battingStrikeRate / 5 + battingAverage * 0.8) +
    (bowlingStrikeRate > 0 ? 500 / bowlingStrikeRate : 0) +
    (economyRate > 0 ? 140 / economyRate : 0);

  return points;
};

const TeamDetails = () => {
  const [team, setTeam] = useState([]);
  const [totalPoints, setTotalPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get userId from localStorage
  const userId = localStorage.getItem('userId');
  const isAuthenticated = !!userId;

  useEffect(() => {
    if (isAuthenticated) {
      fetchTeam();
    }
  }, [isAuthenticated]);

  const fetchTeam = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/team?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch team');
      const teamData = await response.json();
      setTeam(teamData);

      // Calculate total points only if team has 11 players
      if (teamData.length === 11) {
        const points = teamData.reduce((sum, player) => sum + calculatePlayerPoints(player), 0);
        setTotalPoints(points);
      } else {
        setTotalPoints(null);
      }
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
      await fetchTeam(); // Refresh team data after removal
      alert(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Your Team</h1>
        <p className="text-red-500 text-center">Please log in to view your team.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Your Team</h1>

      {loading && (
        <p className="text-center text-gray-500">Loading team details...</p>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Team Status: {team.length}/11 Players Selected
          </h2>
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

          {team.length === 11 && totalPoints !== null && (
            <p className="mt-4 text-lg font-medium">
              <strong>Total Team Points:</strong> {totalPoints.toFixed(2)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;