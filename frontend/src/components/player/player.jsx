import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayerDetails = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5000/player/getplayers");
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const toggleDetails = (index) => {
    setExpandedPlayer(expandedPlayer === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading Players...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
        <div className="text-xl font-semibold text-red-400 bg-white/95 p-4 rounded-lg shadow-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50 flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-200 to-teal-200 text-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold tracking-wide flex items-center gap-2">
          <span className="text-blue-500">🏏</span> Player Information
        </div>
        <button
          onClick={handleBackToDashboard}
          className="px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Back to Dashboard
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex justify-center px-6 py-8 mx-auto">
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 text-center animate-fade-in">
              Player Roster
            </h1>

            {/* Player List */}
            {players.length > 0 ? (
              <div className="space-y-4">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-blue-500">
                        {player.Name}
                      </h2>
                      <button
                        onClick={() => toggleDetails(index)}
                        className="px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white transition-all duration-300 transform hover:scale-105"
                      >
                        {expandedPlayer === index ? "Hide Details" : "View Details"}
                      </button>
                    </div>

                    {/* Player Details (Expanded) */}
                    {expandedPlayer === index && (
                      <div className="mt-4 p-4 bg-white rounded-lg shadow-inner animate-slide-up">
                        <p className="text-gray-600 mb-2">
                          <strong className="text-gray-800">University:</strong>{" "}
                          {player.University}
                        </p>
                        <p className="text-gray-600 mb-4">
                          <strong className="text-gray-800">Category:</strong>{" "}
                          {player.Category}
                        </p>

                        {/* Player Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">
                              <strong>Total Runs:</strong> {player.Total_Runs}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">
                              <strong>Balls Faced:</strong> {player.Balls_Faced}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">
                              <strong>Innings:</strong> {player.Innings_Played}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">
                              <strong>Wickets:</strong> {player.Wickets}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">
                              <strong>Overs Bowled:</strong> {player.Overs_Bowled}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-600">
                              <strong>Runs Conceded:</strong> {player.Runs_Conceded}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No players found in the roster.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
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

export default PlayerDetails;