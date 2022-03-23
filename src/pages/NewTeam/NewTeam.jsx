import './NewTeam.scss'
import TeamForm from '../../components/TeamForm/TeamForm';
import Title from '../../components/Title/Title';

const NewTeam = () => {
  
  return (
    <main className='newTeam__content'>
      <Title  text={'Votre équipe'}/>
      <TeamForm />
    </main>
  )
}

export default NewTeam