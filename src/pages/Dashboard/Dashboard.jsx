import './Dashboard.scss'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import Teams from '../../components/Teams/Teams';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
// import Options from '../../components/Options/Options';

const Dashboard = () => {
const [enoughPlayers, setEnoughPlayers] = useState(false)
const [localStorageAvailable, setIsLocalStorageAvailable] = useState(true)
const dispatch = useDispatch()
const state = useSelector((state) => state)
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

useCallback(
    () => { isLocalStorageAvailable()
    const localStorage = JSON.parse(getLocalStorage('molkking_param'))
    if (localStorageAvailable && localStorage && localStorage.state.teams.length === state.teams.length) {
      dispatch({ type: "setState"})
    }
    }, [dispatch, localStorageAvailable, state.teams.length],
  )
  
  const handleStartGame = () => {
    dispatch({ type: "startGame"})
    setNewLocalStorage()
    navigate(`/game/${state.teams[0].name}/0/${state.teams[0].players[0]}`, { replace: true })
    
  }

  const handleContinueGame = () => {
    navigate(`/game/${state.teams[state.turn].name}/${state.turn}/${state.teams[state.turn].players[state.teams[state.turn].playerTurn]}`, { replace: true })
  }

  const setNewLocalStorage = () => {
    setLocalStorage({ date: new Date(), state })
  }
  const addNewTeam = () => {
    navigate('/new-team', {replace: true})
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
            {!state.playing && <Button text={"Ajouter une nouvelle équipe"} ico={"fas fa-users"} action={addNewTeam} colorFront={'#af8c5e'} colorBack1={'#7e5f33'} colorBack2={'#6D522C'}/> }
            {/* <Options/> */}
          </div>
          {state.teams.length > 1? 
            <div className='Dashboard__startGame'>
              {enoughPlayers && !state.playing && <Button text={"Commencer à jouer"} action={handleStartGame} colorFront={'#219653'} colorBack1={'#00672a'} colorBack2={'#003314'}/>}
              {state.playing && <Button text={'Continuer la partie'} action={handleContinueGame} />}
            </div>
            : null
          }
        </main>
        <Footer/>
      </div>
    )
}

export default Dashboard