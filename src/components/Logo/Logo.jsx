import './Logo.scss'
import { Link } from 'react-router-dom'

const Logo = () => (
  <div id="logo" className='logo'>
    <Link to="/" className='logo__link'>MölkKing</Link> 
  </div>
)

export default Logo
