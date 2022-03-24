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
    const rawLocalStorage = getLocalStorage('molkking_param')
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
        removeLocalStorage()
      }
    }
    
  const handleStartNewGame = () => {
    dispatch({type: "startNewGame"})
    // check localStorage
    const rawLocalStorage = getLocalStorage('molkking_param')
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
        removeLocalStorage()
      }
    }

    if (window.innerWidth < 767) {
      return (
            <header className={`navbar ${showLinks? "show-nav" : "" }`}>
              <Logo className='navbar__logo'/>
              <ul className='navbar__links'>
    
                <li className='navbar__item' onClick={handleShowLinks}>
                  <Link to="/" className='navbar__link'><i className="fa-solid fa-house"></i> Accueil</Link>
                </li>
                <li className='navbar__item' onClick={handleShowLinks}>
                  <Link to="/skittles" className='navbar__link'><i className="fas fa-shapes"></i> Placer les quilles</Link>
                </li>
                <li className='navbar__item' onClick={handleShowLinks}>
                  <Link to="/rules" className='navbar__link'><i className="fa-solid fa-file-lines"></i> Règles</Link>
                </li>
    
                {state.playing && state.winner === null && 
                <li className='navbar__item' onClick={handleShowLinks}>
                  <Link to="/dashboard" className='navbar__link'><i className="fa-solid fa-list-ol"></i> Scores</Link>
                </li>}
                {state.playing &&
                <li className='navbar__item' onClick={handleShowLinks}>
                <Link to="/dashboard" className='navbar__link' onClick={handleRestartGame}><i className="fas fa-redo"></i> Recommencer la partie</Link>
                </li>}
                {state.playing && 
                <li className='navbar__item' onClick={handleShowLinks}>
                  <Link to="/" className='navbar__link' onClick={handleStartNewGame}><i className="fas fa-undo"></i>Nouvelle partie</Link>
                </li>}
              </ul>
              <button className='navbar__burger' onClick={handleShowLinks}>
                <span className="burger-bar"></span>
              </button>
            </header>
      )
    } else if (window.innerWidth > 767) {
      return (
        <header className={`navbar ${showLinks? "show-nav" : "" }`}>
          <div className='navbar__desktop-top'>
            <Logo className='navbar__logo'/>
          </div>
          <ul className='navbar__links navbar__desktop-side'>
            <li className='navbar__item' onClick={handleShowLinks}>
              <Link to="/" className='navbar__link'><i className="fa-solid fa-house"></i> Accueil</Link>
            </li>
            <li className='navbar__item skittles' onClick={handleShowLinks}>
              <Link to="/skittles" className='navbar__link'><i className="fas fa-shapes"></i> Placer les quilles</Link>
            </li>
            <li className='navbar__item rules' onClick={handleShowLinks}>
              <Link to="/rules" className='navbar__link'><i className="fa-solid fa-file-lines"></i> Règles</Link>
            </li>
            {state.playing &&
            <li className='navbar__item restart' onClick={handleShowLinks}>
            <Link to="/dashboard" className='navbar__link' onClick={handleRestartGame}><i className="fas fa-redo"></i> Recommencer la partie</Link>
            </li>}
            {state.playing && 
            <li className='navbar__item newGame' onClick={handleShowLinks}>
              <Link to="/" className='navbar__link' onClick={handleStartNewGame}><i className="fas fa-undo"></i>Nouvelle partie</Link>
            </li>}
          </ul>
        </header>
      )
    }

}

export default Header
