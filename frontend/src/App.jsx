import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import FogetPassword from './components/FogetPassword/FogetPassword'
import Players from '../pages/admin/player/Players'; // Your Players component
import PlayerStats from '../pages/admin/player_stats/PlayerStats';
import TeamPage from './components/teams/team'
import TopPerformers from './pages/admin/tournamantSammary/tournamentSammary'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<FogetPassword />} />
        <Route path="/players" element={<Players />} /> {/* Add Players route */}
        <Route path="/playerstats" element={<PlayerStats />} />ss
        <Route path="/team" element={<TeamPage />} />
        <Route path="/tournamentSummary" element={<TopPerformers />} />
      </Routes>
    </Router>
  );
}

export default App;