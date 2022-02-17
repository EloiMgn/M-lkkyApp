import './Winner.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import Fireworks from '../../components/Fireworks/Fireworks';

const Winner = () => {
  const {id} = useParams();
  const state = useSelector((state) => state)
  const [localStorageAvailable, setIsLocalStorageAvailable] = useState(true)
  const dispatch = useDispatch()
  
    /**
     * Check availability to use localStorage
     */
     const isLocalStorageAvailable = () => {
      const test = 'test'
      try {
        localStorage.setItem(test, test)
        localStorage.removeItem(test)
        setIsLocalStorageAvailable(true)
      } catch (e) {
        setIsLocalStorageAvailable(false)
      }
    }
  
    useEffect(() => {
      isLocalStorageAvailable()
      const localStorage = JSON.parse(getLocalStorage())
      if (localStorageAvailable && localStorage && localStorage.state.teams.length === state.teams.length) {
        dispatch({ type: "setStateWinner"})
      }
    }, [dispatch, localStorageAvailable, state.teams.length])

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
  <div id="Winner" className="Winner">
    <Header/>
    {state.teams.map((team, i) => {
      if(i === parseInt(id)) {
        return (
        <main className='Winner__content' key={i}>
          <div className='winner'>
            <h1 className='winner__team'>L'équipe {team.name}</h1>
            <h2 className='winner__teaxt'>avec</h2>
            <div className='winner__players'>
              {team.players.map((player, idx) => {
                return <h2 className='winner__player' key={idx}>{player}</h2>
              })}
            </div>
            <h2 className='winner__player'>a gagné !!</h2>
          </div>
          <div className='options'>
          <p className='options__text'>Vous pouvez :</p>
          <Button elt={"Dashboard"} className='Dashboard__btn' text={"Recommencer la partie"} link={`/dashboard`} size={"small"} action={handleRestartGame}/>
          <Button elt={"Dashboard"} className='Dashboard__btn' text={"Démarrer une nouvelle partie"} link={`/dashboard`} size={"small"} action={handleStartNewGame}/>
          </div>
          <Fireworks />
        </main>
      )} return null
    }  
    )}
    <Footer />
  </div>
)
}

export default Winner