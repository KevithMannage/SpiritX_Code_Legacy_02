import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [selectedTab, setSelectedTab] = useState("profile");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  // Get the userId from localStorage (or your preferred method)
  const userId = localStorage.getItem("userId") || "defaultUserId";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "team") {
      // Navigate to the specific team page based on userId
      navigate(`/team/${userId}`);
    } else {
      navigate(`/${tab}`);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Dashboard</div>
        <div className="flex space-x-4">
          <button onClick={() => handleTabChange("playerdetails")} className={`px-4 py-2 rounded-md ${selectedTab === "playerdetails" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}>Player</button>
          <button onClick={() => handleTabChange("team")} className={`px-4 py-2 rounded-md ${selectedTab === "team" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}>Select Your Team</button>
          <button onClick={() => handleTabChange("leaderboard")} className={`px-4 py-2 rounded-md ${selectedTab === "leaderboard" ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"}`}>Leaderboard</button>
          <button onClick={() => handleTabChange("budget")} className={`px-4 py-2 rounded-md ${selectedTab === "budget" ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"}`}>Budget</button>
          <button onClick={() => handleTabChange("chatbot")} className={`px-4 py-2 rounded-md ${selectedTab === "chatbot" ? "bg-teal-500 text-white" : "bg-gray-700 text-gray-300"}`}>Chatbot</button>
          <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 space-y-6 md:space-y-8 sm:p-10">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Hello, {username}!</h1>

            {/* Render Content Based on Tab */}
            {selectedTab === "playerdetails" && <div className="text-center"><h2 className="text-xl font-semibold">Player Information</h2><p>Here you can display player-related details or statistics.</p></div>}
            {selectedTab === "team" && <div className="text-center"><h2 className="text-xl font-semibold">Select Your Team</h2><p>Here you can view and manage your team selection.</p></div>}
            {selectedTab === "leaderboard" && <div className="text-center"><h2 className="text-xl font-semibold">Leaderboard</h2><p>Here you can view the top players and their rankings.</p></div>}
            {selectedTab === "budget" && <div className="text-center"><h2 className="text-xl font-semibold">Budget Management</h2><p>Track and manage your in-game budget here.</p></div>}
            {selectedTab === "profile" && <div className="text-center"><p>Profile content goes here.</p></div>}
            {selectedTab === "chatbot" && (
              <div className="text-center">
                <h2 className="text-xl font-semibold">Chatbot</h2>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="h-48 overflow-y-auto mb-4 border-b">
                    <ul>
                      {messages.map((msg, index) => (
                        <li key={index} className="mb-2">
                          <strong>{msg.sender}:</strong> {msg.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full p-2 rounded-l-md border"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-teal-500 text-white px-4 py-2 rounded-r-md"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
