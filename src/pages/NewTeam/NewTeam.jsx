import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RandomTeamsForm from '../../components/RandomTeamsForm/RandomTeamsForm';
import TeamForm from '../../components/TeamForm/TeamForm';
import Title from '../../components/Title/Title';
import './NewTeam.scss';

const NewTeam = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleCancel = ()=> {
    if(state.randomTeams){
      dispatch({type: 'startNewGame'});
      navigate('/dashboard', { replace: true });
    } else if(state.teams.length === 0 && !state.randomTeams) {
      navigate('/dashboard', { replace: true });
      dispatch({type: 'randomTeams', value: true});
    } else if(state.teams.length !== 0 && !state.randomTeams) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <main className='newTeam__content'>
      <div className='newTeam__content__title'>
        {state.randomTeams && <Title  text={'Vos équipes'}/>}
        {!state.randomTeams && <Title  text={'Votre équipe'}/>}

        {window.innerWidth<767 && <i className="fas fa-times" onClick={handleCancel}></i>}
      </div>
      {!state.randomTeams && <TeamForm />}
      {state.randomTeams && <RandomTeamsForm/>}
    </main>
  );
};

export default NewTeam;