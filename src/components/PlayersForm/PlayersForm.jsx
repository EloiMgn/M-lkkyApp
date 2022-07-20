
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import { NumberPicker } from 'react-widgets';
// import { setLocalStorage } from '../../utils/localStorage';
import { shuffleArray } from '../../utils/tools';
import Button from '../Button/Button';
import Options from '../Options/Options';
import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';
import './PlayersForm.scss';

const PlayersForm = () => {
  const state = useSelector((state) => state);
  const [playerList, setplayerList] = useState([{player: '', hide: false}]);
  // const [teamsNumber, setTeamsnumber] = useState(null);
  const teamsList = [];
  // const [validTeams, setValidTeams] = useState(false);
  const navigate= useNavigate();
  const dispatch = useDispatch();


  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    const list = [...playerList];
    list.splice(index, 1);
    setplayerList(list);
  };

  const handleValidateTeams = () => {
    const playerNames = [];
    playerList.forEach(player => {
      playerNames.push(player.player);
    });
    playerNames.pop();
    shuffleArray(playerNames);
    shuffleArray(pickableColors);
    splitArray(playerNames, playerList.length-1, teamsList);
    teamsList.forEach((team, i) => {
      console.log(team);
      dispatch({ type: 'createNewTeam', team: {name: `${team[0]}`, players: team, score: 0, fails: 0, playerTurn: 0, level: false, stats:[], eliminated: false, color:`${pickableColors[i+1]}`} });
    });
    navigate('/dashboard', { replace: true });
  };

  const splitArray = (array, arraysCount, arrayOfArrays) => {
    const size = array.length/arraysCount;
    for (let i=0; i<array.length; i+=size) {
      arrayOfArrays.push(array.slice(i,i+size));
    }
  };

  // const handleStart = () => {
  //   dispatch({ type: 'startGame'});
  //   setNewLocalStorage();
  //   state.teams[0].name && navigate(`/game/${state.teams[0].name}/0/${state.teams[0].players[0]}`, { replace: true });
  // };

  // const setNewLocalStorage = () => {
  //   setLocalStorage({ date: new Date().toDateString(), state });
  // };

  const pickableColors = [
    '#12CBC4', // light-blue
    '#00A8C5', // blue
    '#0652DD',
    '#009432', //dark-green
    '#C4E538', //light-green
    '#FFC312', // yellow
    '#F79F1F', // dark-yellow
    '#EE5A24', //orange
    '#EA2027', //red
    '#E81D62', // pink
    '#ED4C67',
    '#FDA7DF', //light-pink
  ];

  const buttonStyleGreen = {
    frontStyle: {
      'background': '#219653',
    },
    frontHoverStyle: {
      'background': '#219653',
    },
    backStyle: {
      'background': 'linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)'
    },
    backHoverStyle: {
      'background': 'linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)'
    }
  };
  return (
    <div className='randomTeams'>
      {state.teams.length === 0 &&
      <>
        <div className='randomTeams__playerList'>
          {playerList.map((x, i) => {
            if (playerList.length > 1 && x.player !== '' && playerList[i+1]) {
              return (
                <Player action={e => handleRemoveClick(e, i)} i={i} player={x.player} key={i}/>
              );
            } return null;
          })}
        </div>
        <div className='randomTeams__addPlayerForm'>
          <PlayerForm list={playerList} setList={setplayerList}/>
        </div>
      </>}
      {playerList.length-1 >= 2 && <Button text={'Valider les joueurs'} action={handleValidateTeams} ico={'fas fa-users'} style={buttonStyleGreen}/>}
      <Options />
      {/* <Button text={'Annuler'} action={handleCancel} style={buttonStyleGray}/> */}
    </div>
  );
};

export default PlayersForm;
