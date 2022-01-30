import './Header.scss'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'


const Header = () => (
  <header id="header" className='header'>
      <Navigation/>
  </header>
)

export default Header
