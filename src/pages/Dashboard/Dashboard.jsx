import './Dashboard.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import Teams from '../../components/Teams/Teams';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
import { isToday, localStorageDateToNewDate } from '../../utils/tools'

const Dashboard = () => {
let state = useSelector((state) => state)
const [enoughPlayers, setEnoughPlayers] = useState(false)
const dispatch = useDispatch()

// check localStorage
const rawLocalStorage = getLocalStorage()
// si il y a quelqueChose dans le localStorage
if (rawLocalStorage !== null) {
  const gotLocalStorage = JSON.parse(rawLocalStorage)

  if(gotLocalStorage.date){
    // si l'user est déja venu aujourd'hui
    if (isToday(localStorageDateToNewDate(gotLocalStorage.date))) {
      state = gotLocalStorage.state
    }
  }
  else {
  // on update le localStorage
  setLocalStorage({ date: new Date(), state })
  }
}

const handleStartGame = () => {
  if(state.playing === false) {
    dispatch({ type: "startGame"})
    setLocalStorage( {date: new Date(), state})
  } 
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