import React from "react";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();

  // Sample leaderboard data
  const sampleData = [
    { rank: 1, name: "Alice", score: 1500 },
    { rank: 2, name: "Bob", score: 1400 },
    { rank: 3, name: "Charlie", score: 1300 },
    { rank: 4, name: "David", score: 1200 },
    { rank: 5, name: "Eve", score: 1100 },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Welcome to the Leaderboard
        </h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2">Rank</th>
              <th className="p-2">Player</th>
              <th className="p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((player) => (
              <tr key={player.rank} className="border-b dark:border-gray-600">
                <td className="p-2">{player.rank}</td>
                <td className="p-2">{player.name}</td>
                <td className="p-2">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
