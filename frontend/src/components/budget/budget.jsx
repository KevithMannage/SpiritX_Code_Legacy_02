import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Base API URL

const Budget = () => {
  const [team, setTeam] = useState([]);
  const [budget, setBudget] = useState({ remaining: 9000000, spent: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Get userId from localStorage
  const userId = localStorage.getItem('userId');
  const isAuthenticated = !!userId;

  useEffect(() => {
    if (isAuthenticated) {
      fetchTeamAndCalculateBudget();
    }
  }, [isAuthenticated]);

  const fetchTeamAndCalculateBudget = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/team?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch team');
      const teamData = await response.json();
      setTeam(teamData);

      // Calculate spent and remaining budget
      const totalSpent = teamData.reduce((sum, player) => sum + player.Purchased_Price, 0);
      const initialBudget = 9000000; // Rs. 9,000,000 as per handbook
      setBudget({
        remaining: initialBudget - totalSpent,
        spent: totalSpent,
      });
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
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Budget</h1>
          <p className="text-red-500 text-lg">Please log in to view your budget.</p>
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
          <h1 className="text-4xl font-bold text-blue-400 mb-6">Budget</h1>

          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-300">Loading budget details...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-900 text-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Budget Overview</h2>
              <p className="text-gray-300">
                <strong>Remaining Budget:</strong> Rs. {budget.remaining.toLocaleString()}
              </p>
              <p className="text-gray-300">
                <strong>Total Spent:</strong> Rs. {budget.spent.toLocaleString()}
              </p>
              <p className="text-gray-300">
                <strong>Initial Budget:</strong> Rs. 9,000,000
              </p>

              <h3 className="text-lg font-medium text-blue-400 mt-6 mb-2">Players in Your Team</h3>
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
                        {player.Name} ({player.University})
                      </span>
                      <span className="text-gray-300">Rs. {player.Purchased_Price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
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

export default Budget;