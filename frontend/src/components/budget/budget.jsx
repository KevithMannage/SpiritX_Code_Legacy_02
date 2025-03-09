import { useState, useEffect } from "react";
import axios from "axios"; // Import axios

const Budget = () => {
  const [budget, setBudget] = useState(1000); // Initial budget
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [playerData, setPlayerData] = useState(null); // State to store player data

  // Fetch player data when the component mounts using axios
  useEffect(() => {
    const fetchPlayerData = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/budget/budgetforuser/${userId}`);
          console.log(response.data); // Log the response data
          setPlayerData(response.data); // Set the player data to state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("User ID not found in localStorage");
      }
    };

    fetchPlayerData();
  }, []); // Empty dependency array means it runs only once when the component mounts

  const handleAddExpense = () => {
    if (expense && amount) {
      const newAmount = parseFloat(amount);
      if (newAmount > 0 && newAmount <= budget) {
        setExpenses([...expenses, { name: expense, cost: newAmount }]);
        setBudget(budget - newAmount);
        setExpense("");
        setAmount("");
      } else {
        alert("Invalid amount or insufficient budget.");
      }
    }
  };

  // Conditional style for the remaining budget
  const budgetStyle = {
    color: budget < 100 ? 'red' : 'green',
    fontWeight: 'bold',
    fontSize: '1.25rem',
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Budget Tracker</h2>
      
      {/* Remaining Budget with conditional color */}
      <p style={budgetStyle}>
        Remaining Budget: ${budget.toFixed(2)}
      </p>

      {/* Display player data */}
      {playerData && Array.isArray(playerData) && playerData.length > 0 ? (
        playerData.map((player, index) => (
          <div key={index} className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold">Player Info {index + 1}</h3>
            <p><strong>Name:</strong> {player.Name}</p>
            <p><strong>University:</strong> {player.University}</p>
            <p><strong>Category:</strong> {player.Category}</p>
            <p><strong>Total Runs:</strong> {player.Total_Runs}</p>
            <p><strong>Balls Faced:</strong> {player.Balls_Faced}</p>
            <p><strong>Innings Played:</strong> {player.Innings_Played}</p>
            <p><strong>Wickets:</strong> {player.Wickets}</p>
            <p><strong>Overs Bowled:</strong> {player.Overs_Bowled}</p>
            <p><strong>Runs Conceded:</strong> {player.Runs_Conceded}</p>
          </div>
        ))
      ) : (
        <p>No player data available.</p>
      )}

      {/* Expenses list */}
      <ul className="mt-4">
        {expenses.map((item, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            <span>{item.name}</span>
            <span>${item.cost.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budget;
