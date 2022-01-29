import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navigation.scss'
import Logo from '../Logo/Logo'


const Navigation = () => {

  const [showLinks, setShowLinks] = useState(false)

  const handleShowLinks = () => {
    setShowLinks(!showLinks)
  }

  return (

        <nav className={`navbar ${showLinks ? "show-nav" : "" }`}>
          <Logo className='navbar__logo'/>
          <ul className='navbar__links'>
            <li className='navbar__item'>
              <Link to="/skittles" className='navbar__link'>Placer les quilles</Link>
            </li>
            <li className='navbar__item'>
              <Link to="/Rules" className='navbar__link'>Règles</Link>
            </li>
          </ul>
          <button className='navbar__burger'>
            <span className="burger-bar" onClick={handleShowLinks}></span>
          </button>
        </nav>
  )
}

export default Navigation
