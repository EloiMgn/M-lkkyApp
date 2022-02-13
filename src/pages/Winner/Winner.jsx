import './Winner.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/localStorage';


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
    }, [dispatch])

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
              <h1>{team.name}</h1>
              <h2>a gagné !!</h2>
              <p>vous pouvez :</p>
              <Button elt={"Dashboard"} className='Dashboard__btn' text={"Recommencer la partie"} link={`/dashboard`} size={"small"} action={handleRestartGame}/>
              <Button elt={"Dashboard"} className='Dashboard__btn' text={"Démarrer une nouvelle partie"} link={`/dashboard`} size={"small"} action={handleStartNewGame}/>
        </main>
      )}
    })}
    <Footer />
  </div>
)
}

export default Winner