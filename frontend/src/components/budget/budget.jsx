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
      <nav className="bg-gradient-to-r from-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold">Cricket Players Dashboard</div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate('/players')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition duration-300"
              >
                Players
              </button>
              <button
                onClick={() => navigate('/playerstats')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition duration-300"
              >
                Player Stats
              </button>
              <button
                onClick={() => navigate('/tournamentsummary')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition duration-300"
              >
                Tournament Summary
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-900">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  navigate('/players');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
              >
                Players
              </button>
              <button
                onClick={() => {
                  navigate('/playerstats');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
              >
                Player Stats
              </button>
              <button
                onClick={() => {
                  navigate('/tournamentsummary');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition duration-300"
              >
                Tournament Summary
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

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