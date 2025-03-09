import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import FogetPassword from './components/FogetPassword/FogetPassword'
import Players from './pages/admin/player/Players';
import PlayerStats from './pages/admin/player_stats/PlayerStats';
import TeamPage from './components/teams/team';
import Playerdetails from './components/player/player';
import Leaderboard from './components/Dashboard/leaderboard';
import Budget from "./components/budget/budget";
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Chatbox from './components/Chatbot/Chatbot';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/playerdetails" element={<Playerdetails />} /> {/* Add Players route */}
      <Route path="/budget" element={<Budget />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/chatbot" element={<Chatbox />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<FogetPassword />} />
        <Route path="/players" element={<Players />} /> {/* Add Players route */}
        <Route path="/playerstats" element={<PlayerStats />} />
        <Route path="/team/:User_ID" element={<TeamPage />} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    </Router>
  );
}

export default App;