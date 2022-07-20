import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PlayersForm from '../../components/PlayersForm/PlayersForm';
// import PlayerForm from '../../components/PlayerForm/PlayerForm';
import Title from '../../components/Title/Title';
import './NewPlayer.scss';

const Newplayer = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleCancel = ()=> {
    if(state.randomTeams){
      dispatch({type: 'startNewGame'});
      navigate('/dashboard', { replace: true });
    } else navigate('/dashboard', { replace: true });
  };

  return (
    <main className='newTeam__content'>
      <div className='newTeam__content__title'>
        <Title  text={'Joueurs'}/>

        {window.innerWidth<767 && <i className="fas fa-times" onClick={handleCancel}></i>}
      </div>
      <PlayersForm />
    </main>
  );
};

export default Newplayer;