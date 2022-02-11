import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard';
import Home from '../pages/Home/Home'
import Rules from '../pages/Rules/Rules';
import Skittles from '../pages/Skittles/Skittles';
import NewTeam from '../pages/NewTeam/NewTeam';
import Game from '../pages/Game/Game';

const Routing = () => (
  <Router className="index">
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/rules" element={<Rules/>} />
      <Route path="/skittles" element={<Skittles/>} />
      <Route path="/new-team" element={<NewTeam/>} />
      <Route path="/game/:name/:id/:playerId" element={<Game/>} />
    </Routes>
</Router>
)

export default Routing
