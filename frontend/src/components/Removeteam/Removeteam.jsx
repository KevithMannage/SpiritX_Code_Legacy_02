import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Removeteam = () => {
  const { User_ID } = useParams();
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [teamPoints, setTeamPoints] = useState(0);
  const [teamID, setTeamID] = useState(0);

  // Fetch Team ID by User_ID
  useEffect(() => {
    console.log("Fetching team for User_ID:", User_ID);

    const fetchTeamByUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/team/getteambyuser/${User_ID}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const team = await response.json();

        if (team?.Team_ID) {
          setTeamID(team.Team_ID);
        } else {
          console.error("No team found for this user:", team);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    if (User_ID) {
      fetchTeamByUser();
    }
  }, [User_ID]);

  // Fetch team members when teamID is set
  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!teamID) return;

      try {
        const response = await fetch(
          `http://localhost:5000/team/getTeamMembers/${teamID}`
        );
        const data = await response.json();

        console.log("Fetched team members:", data); // Debugging

        // Ensure 'players' key exists in the response and is an array
        if (data && Array.isArray(data.players)) {
          setTeamPlayers(data.players); // Set team players from API response
        } else {
          console.error("Invalid data format:", data);
          setTeamPlayers([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        setTeamPlayers([]); // Fallback in case of an error
      }
    };

    if (teamID) {
      fetchTeamMembers();
    }
  }, [teamID]); // Changed dependency to teamID

  //////////////////////////////////////////////

  // Calculate player points based on the provided logic
  const calculatePoints = (player) => {
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

    return (
      battingStrikeRate / 5 +
      battingAverage * 0.8 +
      (bowlingStrikeRate > 0 ? 500 / bowlingStrikeRate : 0) +
      (economyRate > 0 ? 140 / economyRate : 0)
    );
  };

  // Calculate total team points when players are updated
  useEffect(() => {
    if (teamPlayers.length === 11) {
      const totalPoints = teamPlayers.reduce(
        (total, player) => total + calculatePoints(player),
        0
      );
      setTeamPoints(totalPoints);
    } else {
      setTeamPoints(0); // Reset if not all 11 players are selected
    }
  }, [teamPlayers]);

  // Function to remove a player from the team
  const handleRemovePlayer = async (player) => {
    if (!teamID) {
      alert("Team ID is not available yet.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/team/removePlayerFromTeam/${teamID}/${player.Player_ID}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to remove player: ${errorMessage}`);
      }

      setTeamPlayers((prevPlayers) =>
        prevPlayers.filter((p) => p.Player_ID !== player.Player_ID)
      );

      alert(`${player.Name} removed from team`);
    } catch (error) {
      console.error("Error removing player:", error);
      alert(error.message);
    }
  };

  console.log("User_ID:", User_ID);
  console.log("Team_ID:", teamID);
  console.log("Team Players:", teamPlayers);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Your Team
        </h1>

        {/* Display selected players */}
        <div className="space-y-4">
          {teamPlayers.length > 0 ? (
            teamPlayers.map((player) => (
              <div
                key={player.Player_ID}
                className="p-4 border rounded-lg bg-blue-50 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-blue-600">
                    {player.Name}
                  </h3>
                  <p className="text-gray-700">
                    University: {player.University}
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleRemovePlayer(player)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No players in your team</p>
          )}
        </div>

        {/* Show total points when team is complete */}
        {teamPlayers.length === 11 && (
          <div className="mt-6 p-4 bg-green-200 text-center rounded-lg">
            <h2 className="text-xl font-bold text-green-700">
              Total Team Points: {teamPoints.toFixed(2)}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Removeteam;