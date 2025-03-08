import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import FogetPassword from './components/FogetPassword/FogetPassword'; // Typo: should be ForgetPassword?

import Players from '../pages/admin/player/Players'; // Your Players component
import PlayerStats from '../pages/admin/player_stats/PlayerStats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<FogetPassword />} />
        {/* <Route path="/player" element={<Player />} /> */} {/* Uncomment if needed */}
        <Route path="/players" element={<Players />} /> {/* Add Players route */}
        <Route path="/playerstats" element={<PlayerStats />} />
      </Routes>
    </Router>
  );
}

export default App;