import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TeamPage = () => {
  const { User_ID } = useParams();

  if (!User_ID) {
    return <div>Invalid User ID</div>;
  }
  const [categories] = useState(["Batsman", "All-rounder", "Bowler"]);
  const [selectedCategory, setSelectedCategory] = useState("Batsman");
  const [players, setPlayers] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [teamID, setTeamID] = useState(0);

  useEffect(() => {
    const fetchPlayersByCategory = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/player/getplayerbycategory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ category: selectedCategory }),
          }
        );

        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayersByCategory();
  }, [selectedCategory]);

  useEffect(() => {
    console.log("Fetching team players for User_ID:", User_ID);
    const fetchTeamByUser = async () => {
      try {
        const teamResponse = await fetch(
          `http://localhost:5000/team/getteambyuser/${User_ID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const team = await teamResponse.json();
        setTeamID(team.Team_ID);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    if (User_ID) {
      fetchTeamByUser();
    }
  }, [User_ID]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/team/getMembers/${teamID}`
        );
        const data = await response.json();

        console.log("Fetched team members:", data); // Debugging

        if (data && Array.isArray(data.players)) {
          setTeamPlayers(data.players); // Extract the array correctly
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
      // Changed condition to check teamID instead of User_ID
      fetchTeamMembers();
    }
  }, [teamID]); // Changed dependency to teamID

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddPlayer = async (player) => {
    if (!teamID) {
      alert("Team ID is not available yet. Please try again later.");
      return;
    }
    try {
      await fetch("http://localhost:5000/team/addPlayerToTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Team_ID: teamID,
          Player_ID: player.Player_ID,
        }),
      });

      setTeamPlayers([...teamPlayers, player]);
      alert(`${player.Name} added to team`);
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player to team");
    }
  };

  // const handleRemovePlayer = async (player) => {
  //   if (!teamID) {
  //     alert("Team ID is not available yet. Please try again later.");
  //     return;
  //   }
  //   try {
  //     await fetch("http://localhost:5000/team/removePlayerFromTeam", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         Team_ID: teamID,
  //         Player_ID: player.Player_ID,
  //       }),
  //     });

  //     setTeamPlayers(
  //       teamPlayers.filter((p) => p.Player_ID !== player.Player_ID)
  //     );
  //     alert(`${player.Name} removed from team`);
  //   } catch (error) {
  //     console.error("Error removing player:", error);
  //     alert("Failed to remove player from team");
  //   }
  // };

  // Log User_ID and teamID to console before return
  console.log("User_ID:", User_ID);
  console.log("Team_ID:", teamID);
  console.log("Team Players:", teamPlayers);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Team Page
        </h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Select Category:
          </h2>
          <div className="flex space-x-4 mt-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-lg rounded-md ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Players in {selectedCategory}
          </h2>
          <div className="space-y-4">
            {players.length > 0 ? (
              players.map((player) => {
                const isInTeam = teamPlayers.some(
                  (p) => p.Player_ID === player.Player_ID
                );
                return (
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
                    {isInTeam ? (
                      // <button
                      //   className="px-4 py-2 bg-red-500 text-white rounded-md"
                      //   onClick={() => handleRemovePlayer(player)}
                      // >
                      //   Remove From Team
                      // </button>
                      <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Player is Added
                      </span>
                    ) : (
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                        onClick={() => handleAddPlayer(player)}
                      >
                        Add to Team
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">
                No players available in this category
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
