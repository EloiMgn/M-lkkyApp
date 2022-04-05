import './NewTeam.scss'
import TeamForm from '../../components/TeamForm/TeamForm';
import Title from '../../components/Title/Title';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RandomTeamsForm from '../../components/RandomTeamsFrom/RandomTeamsForm';

const NewTeam = () => {
  const navigate= useNavigate()
  const state = useSelector((state) => state)

  const handleCancel = ()=> {
    navigate('/dashboard', { replace: true })
  }
  
  return (
    <main className='newTeam__content'>
      <div className='newTeam__content__title'>
        <Title  text={'Votre équipe'}/>
        {window.innerWidth<767 && <i class="fas fa-times" onClick={handleCancel}></i>}
      </div>
      {!state.randomTeams && <TeamForm />}
      {state.randomTeams && <RandomTeamsForm/>}
    </main>
  )
}

export default NewTeam