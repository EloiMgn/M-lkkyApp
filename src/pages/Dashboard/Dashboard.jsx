import './Dashboard.scss'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import Teams from '../../components/Teams/Teams';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'

const Dashboard = () => {
const [enoughPlayers, setEnoughPlayers] = useState(false)
const [localStorageAvailable, setIsLocalStorageAvailable] = useState(true)
const dispatch = useDispatch()
const state = useSelector((state) => state)

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

useCallback(
    () => { isLocalStorageAvailable()
    const localStorage = JSON.parse(getLocalStorage())
    if (localStorageAvailable && localStorage && localStorage.state.teams.length === state.teams.length) {
      dispatch({ type: "setState"})
    }
    }, [dispatch, localStorageAvailable, state.teams.length],
  )
  
  const handleStartGame = () => {
      dispatch({ type: "startGame"})
      setNewLocalStorage()
  }

  const setNewLocalStorage = () => {
    setLocalStorage({ date: new Date(), state })
  }

useEffect(() => {
  state.teams.length >= 2 ? setEnoughPlayers(true) : setEnoughPlayers(false)
}, [state])

    return (
      <div id="Dashboard" className="Dashboard">
        <Header/>
        <main className='Dashboard__content'>
          <div className='Dashboard__teams'>
            {(state.playing || state.teams.length > 1) && <h1 className='Dashboard__title'>Equipes:</h1>}
            <Teams/>
            {!state.playing && <Button elt={"Dashboard"} className='Dashboard__btn' text={"Ajouter une nouvelle équipe"} link={"/new-team"} size={"small"} ico={"fas fa-plus-circle"}/>}
            {!state.playing && <Button elt={"Dashboard"} className='Dashboard__btn' text={"Modifier les options de jeu"} link={"/options"} size={"small"}/>}
            {/* {!state.playing && <a elt={"Dashboard"} className='Dashboard__btn' text={""} href="/new-team" size={"small"} ico={"fas fa-plus-circle"}>Ajouter une nouvelle équipe</a>} */}
          </div>
          {state.teams.length > 1? 
            <div className='Dashboard__startGame'>
              {/* {enoughPlayers && !state.playing && <a elt={"Dashboard"} className='Dashboard__btn' text={"Commencer à jouer"} href={`/game/${state.teams[0].name}/1/${state.teams[0].players[0]}`} size={"small"} action={handleStartGame} />a} */}
              {enoughPlayers && !state.playing && <Button elt={"Dashboard"} className='Dashboard__btn' text={"Commencer à jouer"} link={`/game/${state.teams[0].name}/1/${state.teams[0].players[0]}`} size={"small"} action={handleStartGame} />}
              {state.playing && <Button elt={"Dashboard"} className='Dashboard__btn' text={'Continuer la partie'} link={`/game/${state.teams[state.turn].name}/${state.turn+1}/${state.teams[state.turn].players[state.teams[state.turn].playerTurn]}`} size={"small"} action={handleStartGame}/>}
            </div>
            : null
          }
        </main>
      </div>
    )
}

export default Dashboard