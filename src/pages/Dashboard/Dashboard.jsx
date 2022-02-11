import './Dashboard.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import Teams from '../../components/Teams/Teams';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'

const Dashboard = () => {
const [enoughPlayers, setEnoughPlayers] = useState(false)
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
      dispatch({ type: "setState"})
    }
  }, [localStorage])

  
  const handleStartGame = () => {
      dispatch({ type: "startGame"})
      setNewLocalStorage()
  }
  const state = useSelector((state) => state)

  const setNewLocalStorage = () => {
    setLocalStorage({ date: new Date(), state })
  }

useEffect(() => {
  state.teams.length >= 2 ? setEnoughPlayers(true) : setEnoughPlayers(false)
}, [state])

  if (state.playing === false) {
    return (
      <div id="Dashboard" className="Dashboard">
        <Header/>
        <main className='Dashboard__content'>
          <div className='Dashboard__teams'>
            <h1 className='Dashboard__title'>Equipes:</h1>
            <Teams/>
            <div className='Dashboard__createTeamBtn'>
              <Button elt={"Dashboard"} className='Dashboard__btn' text={"Ajouter une nouvelle équipe"} link={"/new-team"} size={"small"} ico={"fas fa-plus-circle"}/>
            </div>
          </div>
            <div className={enoughPlayers === true ? 'Dashboard__startGame ' : 'hidden'}>
              <Button elt={"Dashboard"} className='Dashboard__btn' text={"Commencer à jouer"} link={"/game/1"} size={"small"} action={handleStartGame}/>
            </div>
        </main>
        <Footer/>
      </div>
    )
  } return (
    <div id="Dashboard" className="Dashboard">
    <Header/>
    <main className='Dashboard__content'>
      <div className='Dashboard__teams'>
        <h1 className='Dashboard__title'>Equipes:</h1>
        <Teams/>
      </div>
        <div className={enoughPlayers === true ? 'Dashboard__startGame ' : 'hidden'}>
          <Button elt={"Dashboard"} className='Dashboard__btn' text={"Continuer la partie"} link={`/game/${(state.turn)+1}`} size={"small"}/>
        </div>
    </main>
    <Footer/>
  </div>
  )
}

export default Dashboard