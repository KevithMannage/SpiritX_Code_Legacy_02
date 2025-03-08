import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [selectedTab, setSelectedTab] = useState("profile");
  const navigate = useNavigate();  

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  // Function to handle the tab switching logic
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "player") {
      navigate("/player");
    } else if (tab === "team") {
      navigate("/team"); // Navigate to team selection page (optional)
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Dashboard</div>
        <div className="flex space-x-4">
          {/* Player Tab */}
          <button
            onClick={() => handleTabChange("player")}
            className={`px-4 py-2 rounded-md ${selectedTab === "player" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            Player
          </button>
          {/* Select Your Team Tab */}
          <button
            onClick={() => handleTabChange("team")}
            className={`px-4 py-2 rounded-md ${selectedTab === "team" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            Select Your Team
          </button>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 space-y-6 md:space-y-8 sm:p-10">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Hello, {username}!
            </h1>

            {/* Render Content Based on Tab */}
            {selectedTab === "player" && (
              <div className="text-center">
                <h2 className="text-xl font-semibold">Player Information</h2>
                <p>Here you can display player-related details or statistics.</p>
              </div>
            )}
            {selectedTab === "team" && (
              <div className="text-center">
                <h2 className="text-xl font-semibold">Select Your Team</h2>
                <p>Here you can view and manage your team selection.</p>
              </div>
            )}
            {selectedTab === "profile" && (
              <div className="text-center">
                <p>Profile content goes here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
