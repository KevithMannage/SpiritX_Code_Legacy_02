// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/leaderboard");
            setLeaderboard(response.data.leaderboard);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500 text-lg mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Leaderboard</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-left">
                            <th className="p-4 text-sm font-semibold md:text-base">Rank</th>
                            <th className="p-4 text-sm font-semibold md:text-base">Username</th>
                            <th className="p-4 text-sm font-semibold md:text-base">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry, index) => (
                            <tr
                                key={index}
                                className={`border-b ${
                                    entry.isCurrentUser
                                        ? "bg-cyan-100 font-semibold"
                                        : "hover:bg-gray-50"
                                }`}
                            >
                                <td className="p-4 text-sm md:text-base">{index + 1}</td>
                                <td className="p-4 text-sm md:text-base">{entry.username}</td>
                                <td className="p-4 text-sm md:text-base">
                                    {entry.points.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;