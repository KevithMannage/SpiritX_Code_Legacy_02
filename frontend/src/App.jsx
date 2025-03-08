import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import FogetPassword from './components/FogetPassword/FogetPassword'
import Player  from './components/Players/Player'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<FogetPassword />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </Router>
  )
}

export default App