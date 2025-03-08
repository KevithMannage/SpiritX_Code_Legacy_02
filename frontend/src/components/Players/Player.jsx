import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPlayer, setExpandedPlayer] = useState(null); // Track expanded player

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3000/player/getplayers");
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

  // Toggle player details
  const toggleDetails = (index) => {
    setExpandedPlayer(expandedPlayer === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Player Information</div>
        <button
          onClick={handleBackToDashboard}
          className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
        >
          Back to Dashboard
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center">
              Player List
            </h1>

            {/* Display Player Names with Toggle Button */}
            {players.length > 0 ? (
              <div className="space-y-4">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                        {player.Name}
                      </h2>
                      <button
                        onClick={() => toggleDetails(index)}
                        className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        {expandedPlayer === index ? "Hide Details" : "View Details"}
                      </button>
                    </div>

                    {/* Player Details (Shown Only If Expanded) */}
                    {expandedPlayer === index && (
                      <div className="mt-4 p-4 border-t border-gray-300 dark:border-gray-600">
                        <p className="text-gray-800 dark:text-gray-300 mb-1">
                          <strong>University:</strong> {player.University}
                        </p>
                        <p className="text-gray-800 dark:text-gray-300 mb-2">
                          <strong>Category:</strong> {player.Category}
                        </p>

                        {/* Player Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong>Total Runs:</strong> {player.Total_Runs}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong>Balls Faced:</strong> {player.Balls_Faced}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong>Innings Played:</strong> {player.Innings_Played}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong>Wickets:</strong> {player.Wickets}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong>Overs Bowled:</strong> {player.Overs_Bowled}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong>Runs Conceded:</strong> {player.Runs_Conceded}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">
                No players found.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
