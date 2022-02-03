import './Team.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import TeamForm from '../../components/TeamForm/TeamForm';

const Team = () => {
  return (
    <div id="Team" className="Team">
      <Header/>
      <main className='Team__content'>
        <h1>Votre équipe</h1>
          <TeamForm/>
      </main>
      <Footer/>
    </div>
  )
}

export default Team