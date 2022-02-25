import './NewTeam.scss'
import Header from '../../components/Header/Header'
import TeamForm from '../../components/TeamForm/TeamForm';

const NewTeam = () => {
  
  return (
    <div id="newTeam" className="newTeam">
      <Header/>
      <main className='newTeam__content'>
        <h1>Votre équipe</h1>
          <TeamForm/>
      </main>
    </div>
  )
}

export default NewTeam