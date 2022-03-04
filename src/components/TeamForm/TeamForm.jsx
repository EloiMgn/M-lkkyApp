
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import './TeamForm.scss'
import PlayerForm from '../PlayerForm/PlayerForm';
import TeamNameForm from '../TeamNameForm/TeamNameForm';

const TeamForm = () => {
  const [validate, setValidate] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [playerList, setplayerList] = useState([{player: "", hide: false}])
  const [Team, setTeam] = useState([{name: teamName, players: '', score: 0, fails: 0, playerTurn: 0, level: false, stats:[], eliminated: false}])
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
    newTeam[0].players = Team[0].name

    dispatch({ type: "createNewTeam", team: Team[0] })
    navigate('/dashboard', { replace: true })
    }
  }

return (
  <div className="TeamForm">
    <TeamNameForm name={teamName} setName={setTeamName} setValidate={setValidate} team={Team} setTeam={setTeam}/>
    <PlayerForm list={playerList} setList={setplayerList}/>
    {validate && <button className='teamForm__btn validateBtn' onClick={e => handleValidate(e)}>Valider l'équipe</button>}
  </div>
  );
}

export default TeamForm;
