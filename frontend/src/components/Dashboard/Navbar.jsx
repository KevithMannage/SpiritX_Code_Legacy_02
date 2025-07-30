import React from "react";

const Navbar1 = ({ selectedTab, handleTabChange, handleLogout }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Dashboard</div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleTabChange("playerdetails")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "playerdetails" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Player
        </button>
        <button
          onClick={() => handleTabChange("team")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "team" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Select Your Team
        </button>
        <button
          onClick={() => handleTabChange("team-details")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "team-details" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Team
        </button>
        <button
          onClick={() => handleTabChange("leaderboard")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "leaderboard" ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Leaderboard
        </button>
        <button
          onClick={() => handleTabChange("budget")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "budget" ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Budget
        </button>
        <button
          onClick={() => handleTabChange("chatbot")}
          className={`px-4 py-2 rounded-md ${
            selectedTab === "chatbot" ? "bg-teal-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Chatbot
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar1;