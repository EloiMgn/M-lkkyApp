
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import './TeamForm.scss'
import PlayerForm from '../PlayerForm/PlayerForm';
import TeamNameForm from '../TeamNameForm/TeamNameForm';
import Player from '../Player/Player';

const TeamForm = () => {
  const [validate, setValidate] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [playerList, setplayerList] = useState([{player: "", hide: false}])
  const [Team, setTeam] = useState([{name: teamName, players: '', score: 0, fails: 0, playerTurn: 0, level: false, stats:[], eliminated: false}])
  const [toogle, setToogle] = useState(false)
  const navigate= useNavigate()
  const dispatch = useDispatch();

  const handleValidate = (e) => {
    if(playerList.length > 1) {
    const playerNames = []
    playerList.forEach(player => {
      playerNames.push(player.player)
    })
    playerNames.pop()

    const newTeam = [...Team]
    newTeam[0].players = playerNames

    dispatch({ type: "createNewTeam", team: Team[0] })
    navigate('/dashboard', { replace: true })
    } 
    else {
    const newTeam = [...Team]
    newTeam[0].players = [Team[0].name]

    dispatch({ type: "createNewTeam", team: Team[0] })
    navigate('/dashboard', { replace: true })
    }
  }

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    const list = [...playerList];
    list.splice(index, 1);
    setplayerList(list);
  }

  const tooglePlayer = () => {
    setToogle(!toogle)
  }

return (
  <div className="TeamForm">
    <TeamNameForm name={teamName} setName={setTeamName} setValidate={setValidate} team={Team} setTeam={setTeam}/>
    {playerList.map((x, i) => {
      if (playerList.length > 1 && x.player !== "" && playerList[i+1]) {
        return (
          <Player action={e => handleRemoveClick(e, i)} i={i} player={x.player} key={i}/>
        ) 
      } return null
    })}
    {!toogle && <div className='addPlayer__button' onClick={e => tooglePlayer()}>
      <p>Ajouter un joueur</p><i className="fas fa-user-plus"></i>
      </div> }
    {toogle && <PlayerForm list={playerList} setList={setplayerList} setToogle={setToogle}/>}
    {validate && <button className='teamForm__btn validateBtn' onClick={e => handleValidate(e)}>Valider l'équipe</button>}
  </div>
  );
}

export default TeamForm;
