import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard';
import Home from '../pages/Home/Home'


const Routing = () => (
  <Router className="index">
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      {/* <Route path="/Rules" element={<Home/>} /> */}
    </Routes>
</Router>
)

export default Routing
