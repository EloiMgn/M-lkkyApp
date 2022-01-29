import './Header.scss'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import Burger from '../Navigation/Navigation'


const Header = () => (
  <header id="header" className='header'>
      {/*  */}
      <Burger/>
  </header>
)

export default Header
