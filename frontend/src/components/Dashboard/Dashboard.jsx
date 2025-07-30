// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar1 from "./Navbar";
// const Dashboard = () => {
//   const [username, setUsername] = useState("");
//   const [selectedTab, setSelectedTab] = useState("profile");
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const navigate = useNavigate();

//   // Get the userId from localStorage (or your preferred method)
//   const userId = localStorage.getItem("userId") || "defaultUserId";
//    const user=localStorage.getItem("username");
//    console.log(user);
  

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("loggedInUser");
//     navigate("/");
//   };

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     if (tab === "team") {
//       navigate(`/team/${userId}`);
//     } else if(tab === "team-details"){
//         navigate(`/team-details/${userId}`)
//     }else if(tab==="leaderboard"){
//         navigate(`/leaderboard/${userId}`)
//     }else {
//       navigate(`/${tab}`);
//     }
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== "") {
//       setMessages([...messages, { sender: "You", text: newMessage }]);
//       setNewMessage("");
//     }
//   };

//   return ( 
//     <section className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50 flex flex-col"
//     style={{
//         backgroundImage: `url(./playground.jpg)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundBlendMode: 'overlay', // Blends the gradient with the image
//       }}>
//       {/* Header Section */}
//       <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//         <div className="text-2xl font-bold">Dashboard</div>
        
//         <div className="flex space-x-4">
//           <button onClick={() => handleTabChange("playerdetails")} className={`px-4 py-2 rounded-md ${selectedTab === "playerdetails" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}>Player</button>
//           <button onClick={() => handleTabChange("team")} className={`px-4 py-2 rounded-md ${selectedTab === "team" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}>Select Your Team</button>
//           <button onClick={() => handleTabChange("team-details")} className={`px-4 py-2 rounded-md ${selectedTab === "team" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}>Team</button>
//           <button onClick={() => handleTabChange("leaderboard")} className={`px-4 py-2 rounded-md ${selectedTab === "leaderboard" ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"}`}>Leaderboard</button>
//           <button onClick={() => handleTabChange("budget")} className={`px-4 py-2 rounded-md ${selectedTab === "budget" ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300"}`}>Budget</button>
//           <button onClick={() => handleTabChange("chatbot")} className={`px-4 py-2 rounded-md ${selectedTab === "chatbot" ? "bg-teal-500 text-white" : "bg-gray-700 text-gray-300"}`}>Chatbot</button>
//           <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white">Logout</button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex items-center justify-center px-6 py-8 mx-auto">
//         <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
//           <div className="p-8 space-y-6">
//             <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 animate-fade-in">
//               Welcome, <span className="text-blue-400">{username}</span>!
//             </h1>

//             {/* Tab Content */}
//             <div className="animate-slide-up">
//               {selectedTab === "playerdetails" && (
//                 <div className="text-center space-y-4">
//                   <h2 className="text-2xl font-semibold text-gray-700">Player Stats</h2>
//                   <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Player statistics and details go here.</div>
//                 </div>
//               )}
//               {selectedTab === "team" && (
//                 <div className="text-center space-y-4">
//                   <h2 className="text-2xl font-semibold text-gray-700">Your Team</h2>
//                   <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Team selection and management interface.</div>
//                 </div>
//               )}
//               {selectedTab === "leaderboard" && (
//                 <div className="text-center space-y-4">
//                   <h2 className="text-2xl font-semibold text-gray-700">Leaderboard</h2>
//                   <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Top players and rankings display.</div>
//                 </div>
//               )}
//               {selectedTab === "budget" && (
//                 <div className="text-center space-y-4">
//                   <h2 className="text-2xl font-semibold text-gray-700">Budget Overview</h2>
//                   <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Budget tracking and management tools.</div>
//                 </div>
//               )}
//               {selectedTab === "profile" && (
//                 <div className="text-center space-y-4">
//                   <h2 className="text-2xl font-semibold text-gray-700">Profile</h2>
//                   <div className="bg-gray-50 p-4 rounded-lg text-gray-600">User profile information.</div>
//                 </div>
//               )}
//               {selectedTab === "chatbot" && (
//                 <div className="space-y-4">
//                   <h2 className="text-2xl font-semibold text-gray-700 text-center">Chatbot</h2>
//                   <div className="bg-gray-50/80 p-6 rounded-xl shadow-inner">
//                     <div className="h-64 overflow-y-auto mb-4 bg-white rounded-lg p-4">
//                       {messages.map((msg, index) => (
//                         <div
//                           key={index}
//                           className={`mb-3 p-3 rounded-lg ${
//                             msg.sender === "You"
//                               ? "bg-teal-100 text-teal-800 ml-auto max-w-[80%]"
//                               : "bg-gray-100 text-gray-700 max-w-[80%]"
//                           }`}
//                         >
//                           <strong>{msg.sender}:</strong> {msg.text}
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         placeholder="Type your message..."
//                         className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-teal-400 transition-all"
//                       />
//                       <button
//                         onClick={handleSendMessage}
//                         className="px-6 py-3 bg-teal-400 hover:bg-teal-500 text-white rounded-lg transition-all duration-300"
//                       >
//                         Send
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add some custom CSS */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { transform: translateY(20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-in;
//         }
//         .animate-slide-up {
//           animation: slideUp 0.5s ease-out;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar1 from "./Navbar"; // Ensure the file name matches your actual Navbar1 component

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [selectedTab, setSelectedTab] = useState("profile");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  // Get userId and username from localStorage
  const userId = localStorage.getItem("userId") || "defaultUserId";
  const user = localStorage.getItem("username") || "Guest";

  // Set username when component mounts
  useEffect(() => {
    setUsername(user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "team") {
      navigate(`/team/${userId}`);
    } else if (tab === "team-details") {
      navigate(`/team-details/${userId}`);
    } else if (tab === "leaderboard") {
      navigate(`/leaderboard/${userId}`);
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
    <section
      className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50 flex flex-col"
      style={{
        backgroundImage: `url(./playground.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Navbar Component */}
      <Navbar1
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 animate-fade-in">
              Welcome, <span className="text-blue-400">{username}</span>!
            </h1>

            {/* Tab Content */}
            <div className="animate-slide-up">
              {selectedTab === "playerdetails" && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-700">Player Stats</h2>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Player statistics and details go here.</div>
                </div>
              )}
              {selectedTab === "team" && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-700">Your Team</h2>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Team selection and management interface.</div>
                </div>
              )}
              {selectedTab === "team-details" && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-700">Team Details</h2>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Team details and information.</div>
                </div>
              )}
              {selectedTab === "leaderboard" && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-700">Leaderboard</h2>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Top players and rankings display.</div>
                </div>
              )}
              {selectedTab === "budget" && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-700">Budget Overview</h2>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-600">Budget tracking and management tools.</div>
                </div>
              )}
              {selectedTab === "profile" && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-700">Profile</h2>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-600">User profile information.</div>
                </div>
              )}
              {selectedTab === "chatbot" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-700 text-center">Chatbot</h2>
                  <div className="bg-gray-50/80 p-6 rounded-xl shadow-inner">
                    <div className="h-64 overflow-y-auto mb-4 bg-white rounded-lg p-4">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`mb-3 p-3 rounded-lg ${
                            msg.sender === "You"
                              ? "bg-teal-100 text-teal-800 ml-auto max-w-[80%]"
                              : "bg-gray-100 text-gray-700 max-w-[80%]"
                          }`}
                        >
                          <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-teal-400 transition-all"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-6 py-3 bg-teal-400 hover:bg-teal-500 text-white rounded-lg transition-all duration-300"
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
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Dashboard;