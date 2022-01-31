import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard';
import Home from '../pages/Home/Home'
import Rules from '../pages/Rules/Rules';
import Skittles from '../pages/Skittles/Skittles';


const Routing = () => (
  <Router className="index">
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/Rules" element={<Rules/>} />
      <Route path="/Skittles" element={<Skittles/>} />
    </Routes>
</Router>
)

export default Routing
