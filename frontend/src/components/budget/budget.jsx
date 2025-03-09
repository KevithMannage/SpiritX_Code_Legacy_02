import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000'; // Base API URL

const Budget = () => {
  const [team, setTeam] = useState([]);
  const [budget, setBudget] = useState({ remaining: 9000000, spent: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Budget</h1>
        <p className="text-red-500 text-center">Please log in to view your budget.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Budget</h1>

      {loading && (
        <p className="text-center text-gray-500">Loading budget details...</p>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
          <p>
            <strong>Remaining Budget:</strong> Rs. {budget.remaining.toLocaleString()}
          </p>
          <p>
            <strong>Total Spent:</strong> Rs. {budget.spent.toLocaleString()}
          </p>
          <p>
            <strong>Initial Budget:</strong> Rs. 9,000,000
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">Players in Your Team</h3>
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
                    {player.Name} ({player.University})
                  </span>
                  <span>Rs. {player.Purchased_Price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Budget;