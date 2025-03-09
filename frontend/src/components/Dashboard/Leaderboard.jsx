// src/components/TopPerformers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';


const socket = io('http://localhost:5000'); // Connect to your server

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({
    leads: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial fetch
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/leaderboard');
        setLeaderboard(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch top performers');
        setLoading(false);
      }
    };

    fetchLeaderboard();

    // Socket.IO listener
    socket.on('leaderboardUpdated', (data) => {
      setLeaderboard(data);
    });

    // Cleanup
    return () => {
      socket.off('leaderboardUpdated');
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="top-performers-container">
      <div className="performers-section">
        <h2>Top Run Scorer</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Runs</th>
            </tr>
          </thead>
          <tbody>
            {topPerformers.topRunScorers.map((player, index) => (
              <tr key={index}>
                <td>{player.Name}</td>
                <td>{player.Total_Runs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="performers-section">
        <h2>Top Wicket Taker</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Wickets</th>
            </tr>
          </thead>
          <tbody>
            {topPerformers.topWicketTakers.map((player, index) => (
              <tr key={index}>
                <td>{player.Name}</td>
                <td>{player.Wickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="performers-section">
        <h2>Overall Stats</h2>
        <table>
          <thead>
            <tr>
              <th>Total Runs</th>
              <th>Total Wickets</th>
            </tr>
          </thead>
          <tbody>
            {topPerformers.totalRunsAndWickets.map((stats, index) => (
              <tr key={index}>
                <td>{stats.TotalRuns}</td>
                <td>{stats.TotalWickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;