import './Header.scss'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'


const Header = () => (
  <header id="header" className='header'>
      <Logo className='header__logo'/>
      <nav className='header__menu'>
        {/* <ul className='nav'>
          <li className='menu__item'> */}
          <Link to="/skittles" className='logo__link'>Placement des quilles</Link>
          {/* </li>
          <li className='menu__item'> */}
          <Link to="/Rules" className='logo__link'>Règles</Link>
          {/* </li>
        </ul> */}
      </nav>
  </header>
)

export default Header
