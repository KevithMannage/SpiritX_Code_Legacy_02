import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../adminnavbar"; // Verify this path matches your project structure

const AdminDashboard = () => {
  const [username, setUsername] = useState("Admin");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-blue-900">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Welcome, {username}!
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            You are logged in as an administrator. Use the navigation bar to
            explore different sections.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold text-blue-400">Players</h2>
              <p className="mt-2 text-gray-300">
                Manage player information and profiles.
              </p>
              <button
                onClick={() => navigate("/players")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                View Players
              </button>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold text-blue-400">
                Player Stats
              </h2>
              <p className="mt-2 text-gray-300">
                View and analyze player statistics.
              </p>
              <button
                onClick={() => navigate("/playerstats")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                View Stats
              </button>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold text-blue-400">
                Tournaments
              </h2>
              <p className="mt-2 text-gray-300">
                Check tournament summaries and details.
              </p>
              <button
                onClick={() => navigate("/tournamentsummary")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                View Tournaments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
