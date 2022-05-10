import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Options from '../../components/Options/Options';
import RandomTeamsForm from '../../components/RandomTeamsForm/RandomTeamsForm';
import Subtitle from '../../components/Subtitle/Subtitle';
import TeamForm from '../../components/TeamForm/TeamForm';
import Teams from '../../components/Teams/Teams';
import Title from '../../components/Title/Title';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import './Dashboard.scss';

const Dashboard = () => {

  const [enoughPlayers, setEnoughPlayers] = useState(false);
  const [localStorageAvailable, setIsLocalStorageAvailable] = useState(true);
  const [addTeam, setAddTeam] = useState(false);

  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate= useNavigate();
  /**
   * Check availability to use localStorage
   */
  const isLocalStorageAvailable = () => {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      setIsLocalStorageAvailable(true);
    } catch (e) {
      setIsLocalStorageAvailable(false);
    }
  };

  useCallback(
    () => { isLocalStorageAvailable();
      const localStorage = JSON.parse(getLocalStorage('molkking_param'));
      if (localStorageAvailable && localStorage && localStorage.state.teams.length === state.teams.length) {
        dispatch({ type: 'setState'});
      }
    }, [dispatch, localStorageAvailable, state.teams.length],
  );

  const handleStartGame = () => {
    dispatch({ type: 'startGame'});
    setNewLocalStorage();
    navigate(`/game/${state.teams[0].name}/0/${state.teams[0].players[0]}`, { replace: true });
  };

  const handleContinueGame = () => {
    navigate(`/game/${state.teams[state.turn].name}/${state.turn}/${state.teams[state.turn].players[state.teams[state.turn].playerTurn]}`, { replace: true });
  };

  const setNewLocalStorage = () => {
    setLocalStorage({ date: new Date(), state });
  };

  const addNewTeam = () => {
    window.innerWidth < 767? navigate('/new-team', {replace: true}) : setAddTeam(!addTeam);
    dispatch({type: 'randomTeams', value: false});
  };

  const addRandomTeams = () => {
    dispatch({type: 'startNewGame'});
    window.innerWidth < 767? navigate('/new-team', {replace: true}) : setAddTeam(!addTeam);
    dispatch({type: 'randomTeams', value: true});
  };

  useEffect(() => {
    state.teams.length >= 2 ? setEnoughPlayers(true) : setEnoughPlayers(false);
  }, [state]);

  const buttonStyleGreen = {
    frontStyle: {
      'background': '#219653',
      'transition': '200ms'
    },
    frontHoverStyle: {
      'background': '#219653',
      'transition': '200ms'
    },
    backStyle: {
      'background': 'linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)',
      'transition': '200ms'
    },
    backHoverStyle: {
      'background': 'linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)',
      'transition': '200ms'
    }
  };

  return (
    <div className='Dashboard'>
      <Title text={'Tableau de Bord'}/>
      <main className='Dashboard__content'>
        <section className='Dashboard__teams'>
          <>
            {(!state.playing || state.teams.length < 1) && <Subtitle text={'Créez vos équipes'}/>}
            {(state.playing || state.teams.length >= 1) && <Subtitle text={'Equipes'}/>}
            <Teams/>
            {!state.playing && !state.randomTeams && <>
              <Button text={'Ajouter une nouvelle équipe'} ico={'fas fa-users'} action={addNewTeam} />
              <Button text={'Créer des équipes aléatoires'} ico={'fas fa-users'} action={addRandomTeams} />
            </>}
            <Options/>
          </>
          {state.teams.length > 1?
            <div className='Dashboard__startGame'>
              {enoughPlayers && !state.playing && <Button text={'Commencer à jouer'} ico={'fas fa-play'} action={handleStartGame} style={buttonStyleGreen}/>}
              {state.playing && <Button text={'Continuer la partie'} action={handleContinueGame} ico={'fas fa-redo'} animation/>}
            </div>
            : null
          }
        </section>
        {window.innerWidth>767 &&  addTeam &&
        <section className='Dashboard__newTeam open'>
          {!state.randomTeams && <TeamForm addTeam={addTeam} setAddTeam={setAddTeam}/>}
          {state.randomTeams && <RandomTeamsForm addTeam={addTeam} setAddTeam={setAddTeam} startGame={handleStartGame}/>}
        </section>
        }
        {window.innerWidth>767 &&  !addTeam &&
        <section className='Dashboard__newTeam close'>
        </section>
        }
      </main>

    </div>
  );


};

export default Dashboard;