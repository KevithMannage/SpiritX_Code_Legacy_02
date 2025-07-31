import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Leaderboard</h1>
          <p className="text-red-500 text-lg">Please log in to view the leaderboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-blue-900">
          <h1 className="text-4xl font-bold text-blue-400 mb-6">Leaderboard</h1>

          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-300">Loading leaderboard...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-900 text-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          {!loading && !error && leaderboard.length === 0 && (
            <p className="text-center text-gray-300">No teams with exactly 11 players available.</p>
          )}

          {!loading && !error && leaderboard.length > 0 && (
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Top Teams (11 Players)</h2>
              <div className="space-y-2">
                {leaderboard.map((team, index) => (
                  <div
                    key={team.Username}
                    className={`flex justify-between items-center p-2 rounded-lg ${
                      team.Username === loggedInUsername
                        ? 'bg-blue-900 border-2 border-blue-500'
                        : 'bg-gray-600'
                    }`}
                  >
                    <span className="flex items-center text-gray-300">
                      <span className="mr-2 font-medium">{index + 1}.</span>
                      {team.Username}{' '}
                      {team.Username === loggedInUsername && (
                        <span className="ml-2 text-blue-400 font-semibold">(You)</span>
                      )}
                    </span>
                    <span className="text-gray-300">{team.points.toFixed(2)} Points</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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

export default Leaderboard;