import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { shuffleArray } from '../../utils/tools';
import Button from '../Button/Button';
import Player from '../Player/Player';
// import { useDispatch } from 'react-redux';
import PlayerForm from '../PlayerForm/PlayerForm';
import './RandomTeamsForm.scss';

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
];

const RandomTeamsForm = ({addTeam, setAddTeam}) => {

  const [playerList, setplayerList] = useState([{player: '', hide: false}]);
  const [toogle, setToogle] = useState(false);
  const [teamsNumber, setTeamsnumber] = useState(null);

  const navigate= useNavigate();
  // const dispatch = useDispatch();

  const tooglePlayer = () => {
    setToogle(!toogle);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    const list = [...playerList];
    list.splice(index, 1);
    setplayerList(list);
  };

  const handleCancel = ()=> {
    if (window.innerWidth > 765){
      setAddTeam(!addTeam);
    } else if(window.innerWidth<765){
      navigate('/dashboard', { replace: true });
    }
  };

  const handleValidate = () => {
    const playerNames = [];
    playerList.forEach(player => {
      playerNames.push(player.player);
    });
    playerNames.pop();
    shuffleArray(playerNames);

  };

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


  const buttonStyleGray = {
    frontStyle: {
      'background': '#6c6c6c',
      'transition': '200ms'
    },
    frontHoverStyle: {
      'background': '#6c6c6c',
      'transition': '200ms'
    },
    backStyle: {
      'background': '#4e4e4e',
      'transition': '200ms'
    },
    backHoverStyle: {
      'background': '#4c4c4c',
      'transition': '200ms'
    }
  };

  return (
    <div className='randomTeams'>
      <div className='randomTeams__teamNumberSelect'>
        <h2>Nombre d&apos;équipes :</h2>
        <Select
          defaultValue={teamsNumber}
          options={options}
          onChange={setTeamsnumber}
        />
      </div>
      {playerList.map((x, i) => {
        if (playerList.length > 1 && x.player !== '' && playerList[i+1]) {
          return (
            <Player action={e => handleRemoveClick(e, i)} i={i} player={x.player} key={i}/>
          );
        } return null;
      })}
      <div className='randomTeams__addPlayerForm'>

      </div>
      {/* <div className='buttons__desktop'> */}
      {!toogle &&  <Button text={'Ajouter un joueur'} action={tooglePlayer} ico={'fas fa-user-plus'} /> }
      {toogle && <PlayerForm list={playerList} setList={setplayerList} setToogle={setToogle}/>}
      {playerList.length>1 && <Button text={'Valider l\'équipe'} action={handleValidate} ico={'fas fa-users'} style={buttonStyleGreen}/>}
      {/* </div> */}
      <Button text={'Annuler'} action={handleCancel} style={buttonStyleGray}/>
    </div>
  );
};

export default RandomTeamsForm;