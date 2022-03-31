import './NewTeam.scss'
import TeamForm from '../../components/TeamForm/TeamForm';
import Title from '../../components/Title/Title';
import { useNavigate } from 'react-router-dom';

const NewTeam = () => {
  const navigate= useNavigate()

  const handleCancel = ()=> {
    navigate('/dashboard', { replace: true })
  }
  
  return (
    <main className='newTeam__content'>
      <div className='newTeam__content__title'>
        <Title  text={'Votre équipe'}/>
        {window.innerWidth<767 && <i class="fas fa-times" onClick={handleCancel}></i>}
      </div>
      <TeamForm />
    </main>
  )
}

export default NewTeam