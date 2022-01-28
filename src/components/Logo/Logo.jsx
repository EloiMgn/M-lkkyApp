import './Logo.scss'
import { Link } from 'react-router-dom'

const Logo = () => (
  <div id="logo" className='logo'>
    <Link to="/" className='logo__link'>Easy Mölkky</Link>
  </div>
)

export default Logo
