import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const PlayerStats = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    fetchPlayers();
    socket.on("connect", () =>
      console.log("Admin Player Stats connected to WebSocket")
    );
    socket.on("disconnect", () =>
      console.log("Admin Player Stats disconnected from WebSocket")
    );
    socket.on("playerUpdated", (updatedPlayer) => {
      console.log("Received playerUpdated:", updatedPlayer);
      setPlayers((prev) =>
        prev.map((p) =>
          p.Player_ID === updatedPlayer.Player_ID ? updatedPlayer : p
        )
      );
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("playerUpdated");
    };
  }, [players]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const calculateStats = (player) => {
    const battingStrikeRate =
      player.Balls_Faced > 0
        ? (player.Total_Runs / player.Balls_Faced) * 100
        : 0;
    const battingAverage =
      player.Innings_Played > 0 ? player.Total_Runs / player.Innings_Played : 0;
    const totalBallsBowled = player.Overs_Bowled * 6; // Convert overs to balls
    const bowlingStrikeRate =
      player.Wickets > 0 ? totalBallsBowled / player.Wickets : 0;
    const economyRate =
      totalBallsBowled > 0 ? (player.Runs_Conceded / totalBallsBowled) * 6 : 0;

    const points =
      battingStrikeRate / 5 +
      battingAverage * 0.8 +
      (bowlingStrikeRate > 0 ? 500 / bowlingStrikeRate : 0) +
      (economyRate > 0 ? 140 / economyRate : 0);

    const valueRaw = (9 * points + 100) * 1000;
    const value = Math.round(valueRaw / 50000) * 50000;

    return {
      battingStrikeRate: battingStrikeRate.toFixed(2),
      battingAverage: battingAverage.toFixed(2),
      bowlingStrikeRate: bowlingStrikeRate.toFixed(2),
      economyRate: economyRate.toFixed(2),
      points: points.toFixed(2),
      value: value.toLocaleString("en-US"),
    };
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="w-full p-10 ">
      <h2 className="text-4xl font-bold  mb-4 pb-5 pl-10 text-blue-400 drop-shadow-md [text-shadow:_1px_1px_2px_black]">
        Admin Player Stats View
      </h2>

      {/* Players Stats Table */}
      <div className="overflow-x-auto ml-20 mr-20 bg-gray-800">
        <table className="min-w-full border border-gray-300 border-separate rounded-lg overflow-hidden">
          <thead>
            <tr className="!bg-gray-400 sticky top-0">
              <th className="border p-2  text-left">ID</th>
              <th className="border p-4 pr-50 text-left">Name</th>
              <th className="border p-4 pr-80 text-left">University</th>
              <th className="border p-4 pr-15 text-left">Category</th>
              <th className="border p-4 pr-15 text-left">Total Runs</th>
              <th className="border p-4 pr-15 text-left">Balls Faced</th>
              <th className="border p-4 pr-15 text-left">Innings Played</th>
              <th className="border p-4 pr-15 text-left">Wickets</th>
              <th className="border p-4 pr-15 text-left">Overs Bowled</th>
              <th className="border p-4 pr-15 text-left">Runs Conceded</th>
              <th className="border p-4 pr-15 text-left">
                Batting Strike Rate
              </th>
              <th className="border p-4 pr-15 text-left">Batting Average</th>
              <th className="border p-4 pr-15 text-left">
                Bowling Strike Rate
              </th>
              <th className="border p-4 pr-15 text-left">Economy Rate</th>
              <th className="border p-4 pr-15 text-left">Points</th>
              <th className="border p-4 pr-15 text-left">Value (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => {
              const stats = calculateStats(player);
              return (
                <tr
                  key={player.Player_ID}
                  className={`hover:!bg-gray-500 cursor-pointer ${
                    selectedPlayer?.Player_ID === player.Player_ID ? "" : ""
                  } ${
                    index % 2 === 0
                      ? "bg-transparent text-1xl text-blue-100"
                      : "bg-gray-700 text-blue-200"
                  }`}
                  onClick={() => handlePlayerClick(player)}
                >
                  <td className="border p-4 text-left">{player.Player_ID}</td>
                  <td className="border p-4 text-left">{player.Name}</td>
                  <td className="border p-4 text-left">{player.University}</td>
                  <td className="border p-4 text-left">{player.Category}</td>
                  <td className="border p-4 text-right">{player.Total_Runs}</td>
                  <td className="border p-4 text-right">
                    {player.Balls_Faced}
                  </td>
                  <td className="border p-4 text-right">
                    {player.Innings_Played}
                  </td>
                  <td className="border p-4 text-right">{player.Wickets}</td>
                  <td className="border p-4 text-right">
                    {player.Overs_Bowled}
                  </td>
                  <td className="border p-4 text-right">
                    {player.Runs_Conceded}
                  </td>
                  <td className="border p-4 text-right">
                    {stats.battingStrikeRate}
                  </td>
                  <td className="border p-4 text-right">
                    {stats.battingAverage}
                  </td>
                  <td className="border p-4 text-right">
                    {stats.bowlingStrikeRate}
                  </td>
                  <td className="border p-4 text-right">{stats.economyRate}</td>
                  <td className="border p-4 text-right">{stats.points}</td>
                  <td className="border p-4 text-right">{stats.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for Detailed View */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h3 className="text-xl font-semibold mb-4">
              Detailed Stats for {selectedPlayer.Name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>ID:</strong> {selectedPlayer.Player_ID}
                </p>
                <p>
                  <strong>Name:</strong> {selectedPlayer.Name}
                </p>
                <p>
                  <strong>University:</strong> {selectedPlayer.University}
                </p>
                <p>
                  <strong>Category:</strong> {selectedPlayer.Category}
                </p>
              </div>
              <div>
                <p>
                  <strong>Total Runs:</strong> {selectedPlayer.Total_Runs}
                </p>
                <p>
                  <strong>Balls Faced:</strong> {selectedPlayer.Balls_Faced}
                </p>
                <p>
                  <strong>Innings Played:</strong>{" "}
                  {selectedPlayer.Innings_Played}
                </p>
                <p>
                  <strong>Wickets:</strong> {selectedPlayer.Wickets}
                </p>
                <p>
                  <strong>Overs Bowled:</strong> {selectedPlayer.Overs_Bowled}
                </p>
                <p>
                  <strong>Runs Conceded:</strong> {selectedPlayer.Runs_Conceded}
                </p>
              </div>
              <div>
                {(() => {
                  const stats = calculateStats(selectedPlayer);
                  return (
                    <>
                      <p>
                        <strong>Batting Strike Rate:</strong>{" "}
                        {stats.battingStrikeRate}
                      </p>
                      <p>
                        <strong>Batting Average:</strong> {stats.battingAverage}
                      </p>
                      <p>
                        <strong>Bowling Strike Rate:</strong>{" "}
                        {stats.bowlingStrikeRate}
                      </p>
                      <p>
                        <strong>Economy Rate:</strong> {stats.economyRate}
                      </p>
                      <p>
                        <strong>Points:</strong> {stats.points}
                      </p>
                      <p>
                        <strong>Value (Rs):</strong> {stats.value}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerStats;
