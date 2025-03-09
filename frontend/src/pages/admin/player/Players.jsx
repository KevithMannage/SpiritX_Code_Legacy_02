import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    Name: '',
    University: '',
    Category: '',
    Total_Runs: 0,
    Balls_Faced: 0,
    Innings_Played: 0,
    Wickets: 0,
    Overs_Bowled: 0,
    Runs_Conceded: 0,
  });
  const [editPlayer, setEditPlayer] = useState(null);
  const editFormRef = useRef(null);

  useEffect(() => {
    fetchPlayers();
    socket.on('connect', () => console.log('Frontend connected to WebSocket'));
    socket.on('disconnect', () => console.log('Frontend disconnected from WebSocket'));
    socket.on('playerAdded', (player) => {
      console.log('Received playerAdded:', player);
      setPlayers((prev) => [...prev, player]);
    });
    socket.on('playerUpdated', (updatedPlayer) => {
      console.log('Received playerUpdated:', updatedPlayer);
      setPlayers((prev) =>
        prev.map((p) => (p.Player_ID === updatedPlayer.Player_ID ? updatedPlayer : p))
      );
    });
    socket.on('playerDeleted', ({ Player_ID }) => {
      console.log('Received playerDeleted:', { Player_ID });
      setPlayers((prev) => prev.filter((p) => p.Player_ID !== Player_ID));
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('playerAdded');
      socket.off('playerUpdated');
      socket.off('playerDeleted');
    };
  }, [players]);

  useEffect(() => {
    if (editPlayer && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [editPlayer]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/players');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  const addPlayer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/players', newPlayer);
      setNewPlayer({
        Name: '',
        University: '',
        Category: '',
        Total_Runs: 0,
        Balls_Faced: 0,
        Innings_Played: 0,
        Wickets: 0,
        Overs_Bowled: 0,
        Runs_Conceded: 0,
      });
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const startEdit = (player) => {
    setEditPlayer(player);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPlayer({ ...editPlayer, [name]: value });
  };

  const updatePlayer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/players/${editPlayer.Player_ID}`, editPlayer);
      setEditPlayer(null);
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const deletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/players/${id}`);
    } catch (error) {
      console.error('Error deleting player:', error);
      if (error.response && error.response.status === 409) {
        alert(error.response.data.error);
      } else if (error.response && error.response.status === 500) {
        alert('Cannot delete, the player is already is in a team.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Players View</h2>

      {/* Add Player Form */}
      <form onSubmit={addPlayer} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              name="Name"
              value={newPlayer.Name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">University:</label>
            <input
              name="University"
              value={newPlayer.University}
              onChange={handleInputChange}
              placeholder="University"
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              name="Category"
              value={newPlayer.Category}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Category</option>
              <option value="Batsman">Batsman</option>
              <option value="All-Rounder">All-Rounder</option>
              <option value="Bowler">Bowler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Runs:</label>
            <input
              type="number"
              name="Total_Runs"
              value={newPlayer.Total_Runs}
              onChange={handleInputChange}
              placeholder="Total Runs"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Balls Faced:</label>
            <input
              type="number"
              name="Balls_Faced"
              value={newPlayer.Balls_Faced}
              onChange={handleInputChange}
              placeholder="Balls Faced"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Innings Played:</label>
            <input
              type="number"
              name="Innings_Played"
              value={newPlayer.Innings_Played}
              onChange={handleInputChange}
              placeholder="Innings Played"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Wickets:</label>
            <input
              type="number"
              name="Wickets"
              value={newPlayer.Wickets}
              onChange={handleInputChange}
              placeholder="Wickets"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Overs Bowled:</label>
            <input
              type="number"
              name="Overs_Bowled"
              value={newPlayer.Overs_Bowled}
              onChange={handleInputChange}
              placeholder="Overs Bowled"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Runs Conceded:</label>
            <input
              type="number"
              name="Runs_Conceded"
              value={newPlayer.Runs_Conceded}
              onChange={handleInputChange}
              placeholder="Runs Conceded"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Player
        </button>
      </form>

      {/* Edit Player Form */}
      {editPlayer && (
        <form ref={editFormRef} onSubmit={updatePlayer} className="mb-6 space-y-4">
          <h3 className="text-xl font-semibold">Edit Player</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                name="Name"
                value={editPlayer.Name}
                onChange={handleEditChange}
                placeholder="Name"
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">University:</label>
              <input
                name="University"
                value={editPlayer.University}
                onChange={handleEditChange}
                placeholder="University"
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category:</label>
              <select
                name="Category"
                value={editPlayer.Category}
                onChange={handleEditChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Category</option>
                <option value="Batsman">Batsman</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Bowler">Bowler</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Runs:</label>
              <input
                type="number"
                name="Total_Runs"
                value={editPlayer.Total_Runs}
                onChange={handleEditChange}
                placeholder="Total Runs"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Balls Faced:</label>
              <input
                type="number"
                name="Balls_Faced"
                value={editPlayer.Balls_Faced}
                onChange={handleEditChange}
                placeholder="Balls Faced"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Innings Played:</label>
              <input
                type="number"
                name="Innings_Played"
                value={editPlayer.Innings_Played}
                onChange={handleEditChange}
                placeholder="Innings Played"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wickets:</label>
              <input
                type="number"
                name="Wickets"
                value={editPlayer.Wickets}
                onChange={handleEditChange}
                placeholder="Wickets"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Overs Bowled:</label>
              <input
                type="number"
                name="Overs_Bowled"
                value={editPlayer.Overs_Bowled}
                onChange={handleEditChange}
                placeholder="Overs Bowled"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Runs Conceded:</label>
              <input
                type="number"
                name="Runs_Conceded"
                value={editPlayer.Runs_Conceded}
                onChange={handleEditChange}
                placeholder="Runs Conceded"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
          <div className="space-x-2">
            <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Update Player
            </button>
            <button
              type="button"
              onClick={() => setEditPlayer(null)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Players List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">University</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Total Runs</th>
              <th className="border p-2">Balls Faced</th>
              <th className="border p-2">Innings Played</th>
              <th className="border p-2">Wickets</th>
              <th className="border p-2">Overs Bowled</th>
              <th className="border p-2">Runs Conceded</th>
              <th className="border p-2 min-w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.Player_ID} className="hover:bg-gray-100">
                <td className="border p-2">{player.Player_ID}</td>
                <td className="border p-2">{player.Name}</td>
                <td className="border p-2">{player.University}</td>
                <td className="border p-2">{player.Category}</td>
                <td className="border p-2">{player.Total_Runs}</td>
                <td className="border p-2">{player.Balls_Faced}</td>
                <td className="border p-2">{player.Innings_Played}</td>
                <td className="border p-2">{player.Wickets}</td>
                <td className="border p-2">{player.Overs_Bowled}</td>
                <td className="border p-2">{player.Runs_Conceded}</td>
                <td className="border p-2 space-x-2 min-w-[120px]">
                  <button
                    onClick={() => startEdit(player)}
                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePlayer(player.Player_ID)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;