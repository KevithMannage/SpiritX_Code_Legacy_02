import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/leaderboard'; // API endpoint

// Function to calculate team points based on handbook logic
const calculateTeamPoints = (team) => {
  const totalRuns = parseInt(team.TotalRuns, 10) || 0;
  const totalBallsFaced = parseInt(team.TotalBallsFaced, 10) || 0;
  const totalInningsPlayed = parseInt(team.TotalInningsPlayed, 10) || 0;
  const totalOversBowled = parseInt(team.TotalOversBowled, 10) || 0;
  const totalRunsConceded = parseInt(team.TotalRunsConceded, 10) || 0;
  const totalWickets = parseInt(team.TotalWickets, 10) || 0;
  const totalBallsBowled = totalOversBowled * 6;

  const battingStrikeRate = totalBallsFaced > 0 ? (totalRuns / totalBallsFaced) * 100 : 0;
  const battingAverage = totalInningsPlayed > 0 ? totalRuns / totalInningsPlayed : 0;
  const bowlingStrikeRate = totalWickets > 0 ? totalBallsBowled / totalWickets : 0;
  const economyRate = totalBallsBowled > 0 ? (totalRunsConceded / totalBallsBowled) * 6 : 0;

  const points =
    (battingStrikeRate / 5 + battingAverage * 0.8) +
    (bowlingStrikeRate > 0 ? 500 / bowlingStrikeRate : 0) +
    (economyRate > 0 ? 140 / economyRate : 0);

  return points;
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  // Get userId from localStorage
  const userId = localStorage.getItem('userId');
  const isAuthenticated = !!userId;

  useEffect(() => {
    const initializeUser = async () => {
      // Check if username is already in localStorage
      let username = localStorage.getItem('username');
      if (!username && isAuthenticated) {
        try {
          const response = await fetch(`http://localhost:5000/user?userId=${userId}`);
          if (!response.ok) throw new Error('Failed to fetch user details');
          const userData = await response.json();
          username = userData.Username; // Ensure backend returns { Username: "..." }
          localStorage.setItem('username', username); // Persist for future use
        } catch (err) {
          console.error('Error fetching username:', err);
          return; // Proceed without username if fetch fails
        }
      }
      setLoggedInUsername(username ? username.trim().toLowerCase() : null); // Normalize
    };

    if (isAuthenticated) {
      initializeUser().then(() => fetchLeaderboard()); // Fetch leaderboard after username is set
    }
  }, [isAuthenticated]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const responseData = await response.json();
      if (!responseData.success || !Array.isArray(responseData.data.leaderboard)) {
        throw new Error('Invalid leaderboard data format');
      }

      const teamsWithPoints = responseData.data.leaderboard.map((team) => ({
        ...team,
        Username: team.Username.trim().toLowerCase(), // Normalize API data
        points: calculateTeamPoints(team),
      }));

      const sortedTeams = teamsWithPoints.sort((a, b) => b.points - a.points);
      setLeaderboard(sortedTeams);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>
        <p className="text-red-500 text-center">Please log in to view the leaderboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>

      {loading && (
        <p className="text-center text-gray-500">Loading leaderboard...</p>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}

      {!loading && !error && leaderboard.length === 0 && (
        <p className="text-center text-gray-500">No teams with exactly 11 players available.</p>
      )}

      {!loading && !error && leaderboard.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Teams (11 Players)</h2>
          <div className="space-y-2">
            {leaderboard.map((team, index) => (
              <div
                key={team.Username}
                className={`flex justify-between items-center p-2 rounded ${
                  team.Username === loggedInUsername
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100'
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2 font-medium text-gray-700">{index + 1}.</span>
                  {team.Username}{' '}
                  {team.Username === loggedInUsername && (
                    <span className="ml-2 text-blue-500 font-semibold">(You)</span>
                  )}
                </span>
                <span>{team.points.toFixed(2)} Points</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;