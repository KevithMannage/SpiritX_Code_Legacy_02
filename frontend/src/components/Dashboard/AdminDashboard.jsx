import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [username, setUsername] = useState("Admin");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <section className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold mb-8">Admin Dashboard</div>
        <ul>
          <li className="mb-4 hover:text-gray-400">
            <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
          </li>
          <li className="mb-4 hover:text-gray-400">
            <button onClick={() => navigate("/admin/users")}>Manage Users</button>
          </li>
          <li className="mb-4 hover:text-gray-400">
            <button onClick={() => navigate("/admin/settings")}>Settings</button>
          </li>
          <li className="mb-4 hover:text-gray-400">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, {username}!</h1>
          <p className="mt-4 text-gray-600">You are logged in as an administrator. Use the sidebar to navigate through different sections.</p>

          {/* Add any other content for the dashboard here */}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
