import './Winner.scss'
import Header from '../../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import Fireworks from '../../components/Fireworks/Fireworks';
import Footer from '../../components/Footer/Footer';

const Winner = () => {
  const {id} = useParams();
  const state = useSelector((state) => state)
  const [localStorageAvailable, setIsLocalStorageAvailable] = useState(true)
  const dispatch = useDispatch()
  const navigate= useNavigate()
  
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
      const localStorage = JSON.parse(getLocalStorage('molkking_param'))
      if (localStorageAvailable && localStorage && localStorage.state.teams.length > state.teams.length) {
        dispatch({ type: "setState"})
      }
    }, [dispatch, localStorageAvailable, state.teams.length])

    const handleRestartGame = () => {
      for (let i = 0; i < state.teams.length; i++) {
        dispatch({type: "restart", idx: i})
      }
      navigate('/dashboard', {replace: true})
      // check localStorage
      const rawLocalStorage = getLocalStorage()
      // si il y a quelqueChose dans le localStorage
      if (rawLocalStorage !== null) {
          removeLocalStorage()
        }
      }

    const handleStartNewGame = () => {
      dispatch({type: "startNewGame"})
      navigate('/dashboard', {replace: true})
      // check localStorage
      const rawLocalStorage = getLocalStorage()
      // si il y a quelqueChose dans le localStorage
      if (rawLocalStorage !== null) {
          removeLocalStorage()
        }
      }
    const handleSeeStats = () => {
      navigate('/stats', {replace: true})
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
          <div className='winner__options'>
          <Button text={"Recommencer la partie"} action={handleRestartGame} ico={'fas fa-undo'}/>
          <Button text={"Démarrer une nouvelle partie"} action={handleStartNewGame} ico={"fas fa-play"}/>
          <Button text={"Voir les Stats de la partie"} action={handleSeeStats} ico={"fas fa-signal"}/>
          </div>
          <Fireworks />
        </main>
      )} return null
    }  
    )}
    <Footer/>
  </div>
)
}

export default Winner