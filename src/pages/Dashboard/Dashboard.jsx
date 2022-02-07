import './Dashboard.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import Teams from '../../components/Teams/Teams';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Dashboard = () => {
const state = useSelector((state) => state)
const [enoughPlayers, setEnoughPlayers] = useState(false)

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
            <Button elt={"Dashboard"} className='Dashboard__btn' text={"Commencer à jouer"} link={"/new-team"} size={"small"}/>
          </div>
          )
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
      <div className='team team__1'></div>
      {/* <div className='Dashboard__createTeamBtn'>
        <Button elt={"Dashboard"} className='Dashboard__btn' text={"Ajouter une nouvelle équipe"} link={"/Team"} size={"small"} ico={"fas fa-plus-circle"}/>
      </div> */}
    </div>
    {/* <div className='Dashboard__startGame'>
      <Button elt={"Dashboard"} className='Dashboard__btn' text={"Commencer à jouer"} link={"/Team"} size={"small"}/>
    </div> */}
  </main>
  <Footer/>
</div>
)
}

export default Dashboard