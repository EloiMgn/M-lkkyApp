import './Dashboard.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'

const Dashboard = () => {
  return (
    <div id="Dashboard" className="Dashboard">
      <Header/>
      <main className='Dashboard__content'>
        <div className='Dashboard__teams'>
          <h1 className='Dashboard__title'>Equipes:</h1>
          <div className='team team__1'></div>
          <div className='Dashboard__createTeamBtn'>
            <Button elt={"Dashboard"} className='Dashboard__btn' text={"Ajouter une nouvelle équipe"} link={"/team"} size={"small"} ico={"fas fa-plus-circle"}/>
          </div>
        </div>
        <div className='Dashboard__startGame'>
          <Button elt={"Dashboard"} className='Dashboard__btn' text={"Commencer à jouer"} link={"/team"} size={"small"}/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Dashboard