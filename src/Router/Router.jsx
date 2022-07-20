import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Bug from '../pages/Bug/Bug';
import Dashboard from '../pages/Dashboard/Dashboard';
import Game from '../pages/Game/Game';
import Home from '../pages/Home/Home';
import Mentions from '../pages/Mentions/Mentions';
import Newplayer from '../pages/NewPlayer/NewPlayer';
import NewTeam from '../pages/NewTeam/NewTeam';
import Rules from '../pages/Rules/Rules';
import Skittles from '../pages/Skittles/Skittles';
import Stats from '../pages/Stats/Stats';
import Winner from '../pages/Winner/Winner';

const Routing = () => (
  <Router className="index">
    <Header />
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/rules" element={<Rules/>} />
      <Route path="/skittles" element={<Skittles/>} />
      <Route path="/new-team" element={<NewTeam/>} />
      <Route path="/new-player" element={<Newplayer/>} />
      <Route path="/game/:name/:id/:playerId" element={<Game/>} />
      <Route path="/winner/:id" element={<Winner/>} />
      <Route path="/stats" element={<Stats/>} />
      <Route path="/mentions" element={<Mentions/>} />
      <Route path="/bug" element={<Bug/>} />
    </Routes>
    <Footer />
  </Router>
);

export default Routing;
