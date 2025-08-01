
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import FogetPassword from './components/FogetPassword/FogetPassword';
import Players from './pages/admin/player/Players';
import PlayerStats from './pages/admin/player_stats/PlayerStats';
import TeamPage from './components/teams/team';
import Playerdetails from './components/player/player';
import LeaderboardView from './components/LeaderboardView/LeaderboardView';
import Budget from './components/budget/budget';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Chatbox from './components/Chatbot/Chatbot';
import TopPerformers from './pages/admin/tournamantSammary/tournamentSammary';
import TeamDetails from './components/teams/teamDetails';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import LightRaysBackground from './components/LightRaysBackground';
import AdminNavbar from './adminnavbar';
const MainLayout = () => {
  return (
    <>
     <LightRaysBackground />
      <Navbar />
      
      <div className="pt-4 px-4">
        <Outlet />
      </div>
    </>
  );
};


const DashLayout = () => {
  return (
    <>
     <LightRaysBackground />
      <AdminNavbar />

      <div className="pt-4 px-4">
        <Outlet />
      </div>
    </>
  );
};


function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without Navbar */}
         <Route element={<DashLayout />}>
        
        <Route path="/forgetpassword" element={<FogetPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tournamentSummary" element={<TopPerformers />} />
        <Route path="/players" element={<Players />} />
        <Route path="/playerstats" element={<PlayerStats />} />
        </Route>



        {/* Protected routes with Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/playerdetails" element={<Playerdetails />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/chatbot" element={<Chatbox />} />
          <Route path="/team/:User_ID" element={<TeamPage />} />
          <Route path="/team-details/:User_ID" element={<TeamDetails />} />
          <Route path="/leaderboard/:User_ID" element={<LeaderboardView />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
        </Route>
         <Route path="/" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
