import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Header.scss'
import Logo from '../Logo/Logo'
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage';


const Header = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [showLinks, setShowLinks] = useState(false)

  const handleShowLinks = () => {
    setShowLinks(!showLinks)
  }

  const handleRestartGame = () => {
    for (let i = 0; i < state.teams.length; i++) {
      dispatch({type: "restart", idx: i})
    }
    // check localStorage
    const rawLocalStorage = getLocalStorage()
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
        removeLocalStorage()
      }
    }
    
  const handleStartNewGame = () => {
    dispatch({type: "startNewGame"})
    // check localStorage
    const rawLocalStorage = getLocalStorage()
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
        removeLocalStorage()
      }
    }

  return (
        <header className={`navbar ${showLinks ? "show-nav" : "" }`}>
          <Logo className='navbar__logo'/>
          <ul className='navbar__links'>

            <li className={state.playing? 'hidden' : 'navbar__item'}>
              <Link to="/" className='navbar__link'>Accueil</Link>
            </li>
            <li className='navbar__item'>
              <Link to="/skittles" className='navbar__link'>Placer les quilles</Link>
            </li>
            <li className='navbar__item'>
              <Link to="/rules" className='navbar__link'>Règles</Link>
            </li>
            <li className={state.playing && state.winner === null? 'navbar__item' : 'hidden'}>
              <Link to="/dashboard" className='navbar__link'>Scores</Link>
            </li>
            <li className={state.playing? 'navbar__item' : 'hidden'}>
              <Link to="/dashboard" className='navbar__link' onClick={handleRestartGame}>Recommencer la partie</Link>
            </li>
            <li className={state.playing? 'navbar__item' : 'hidden'}>
              <Link to="/" className='navbar__link' onClick={handleStartNewGame}>Nouvelle partie</Link>
            </li>
          </ul>
          <button className='navbar__burger'>
            <span className="burger-bar" onClick={handleShowLinks}></span>
          </button>
        </header>
  )
}

export default Header
