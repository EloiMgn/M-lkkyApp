import './Dashboard.scss'
import Button from '../../components/Button/Button'
import Teams from '../../components/Teams/Teams';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom';
import Options from '../../components/Options/Options';
import TeamForm from '../../components/TeamForm/TeamForm';
import Title from '../../components/Title/Title';

const Dashboard = () => {
const [enoughPlayers, setEnoughPlayers] = useState(false)
const [localStorageAvailable, setIsLocalStorageAvailable] = useState(true)
const dispatch = useDispatch()
const state = useSelector((state) => state)
const navigate= useNavigate()
const [addTeam, setAddTeam] = useState(false)
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
    window.innerWidth < 767? navigate('/new-team', {replace: true}) : 
    setAddTeam(!addTeam)
  }


useEffect(() => {
  state.teams.length >= 2 ? setEnoughPlayers(true) : setEnoughPlayers(false)
}, [state])

const buttonStyleGreen = {
  frontStyle: {
    "background": "#219653",
    "transition": "200ms"
  },
  frontHoverStyle: {
    "background": "#219653",
    "transition": "200ms"
  },
  backStyle: {
    "background": `linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)`,
    "transition": "200ms"
  },
  backHoverStyle: {
    "background": `linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)`,
    "transition": "200ms"
  }
}

  return (
  <div className='Dashboard'>
    <Title text={'Tableau de Bord'}/>
    <main className='Dashboard__content'>
    <section className='Dashboard__teams'>
      <div className='Dashboard__teams'>
        {(!state.playing || state.teams.length < 1) && <h1 className='Dashboard__title'>Créez vos équipes</h1>}
        {(state.playing || state.teams.length >= 1) && <h1 className='Dashboard__title'>Equipes:</h1>}
        <Teams/>
        {!state.playing && window.innerWidth>767  && !addTeam &&  <Button text={"Ajouter une nouvelle équipe"} ico={"fas fa-users"} action={addNewTeam} /> }
        {!state.playing && window.innerWidth<767  && <Button text={"Ajouter une nouvelle équipe"} ico={"fas fa-users"} action={addNewTeam} /> }
        <Options/>
      </div>
      {state.teams.length > 1? 
        <div className='Dashboard__startGame'>
          {enoughPlayers && !state.playing && <Button text={"Commencer à jouer"} ico={"fas fa-play"} action={handleStartGame} style={buttonStyleGreen}/>}
          {state.playing && <Button text={'Continuer la partie'} action={handleContinueGame} ico={"fas fa-redo"} animation/>}
        </div>
        : null
      }
    </section>
      {window.innerWidth>767 &&  addTeam && 
        <section className='Dashboard__newTeam open'>
          <TeamForm addTeam={addTeam} setAddTeam={setAddTeam}/>
        </section>
      }
      {window.innerWidth>767 &&  !addTeam && 
        <section className='Dashboard__newTeam close'>
          {/* <TeamForm addTeam={addTeam} setAddTeam={setAddTeam}/> */}
        </section>
      }
    </main>

  </div>
  ) 

     
}

export default Dashboard