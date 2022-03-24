
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import './TeamForm.scss'
import PlayerForm from '../PlayerForm/PlayerForm';
import TeamNameForm from '../TeamNameForm/TeamNameForm';
import Player from '../Player/Player';
import Button from '../Button/Button';
import ColorForm from '../ColorForm/ColorForm';

const TeamForm = ({addTeam, setAddTeam}) => {
  const [validate, setValidate] = useState(false)
  const [teamName, setTeamName] = useState("")
  const[teamColor, setTeamColor] = useState(null)
  const [playerList, setplayerList] = useState([{player: "", hide: false}])
  const [Team, setTeam] = useState([{name: teamName, players: '', score: 0, fails: 0, playerTurn: 0, level: false, stats:[], eliminated: false, color:''}])
  const [toogle, setToogle] = useState(false)
  const [teamNameValid, setTeamNameValid] = useState(false)
  const [teamColorValid, setTeamColorValid] = useState(false)

  const navigate= useNavigate()
  const dispatch = useDispatch();

  const handleValidate = () => {
   if (window.innerWidth > 765){
     setAddTeam(!addTeam)
   }
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

  const handleCancel = ()=> {
    if (window.innerWidth > 765){
      setAddTeam(!addTeam)
    } else if(window.innerWidth<765){
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

  useEffect(() => {
    if(teamNameValid && teamColorValid) {
      setValidate(true)
    } else if(!teamNameValid || !teamColorValid) {
      setValidate(false)
    }
}, [setValidate, teamColorValid, teamNameValid])

  const buttonStyleGreen = {
    frontStyle: {
      "background": "#219653",
    },
    frontHoverStyle: {
      "background": "#219653",
    },
    backStyle: {
      "background": `linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)`
    },
    backHoverStyle: {
      "background": `linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)`
    }
  }

  
  const buttonStyleGray = {
    frontStyle: {
      "background": "#6c6c6c",
      "transition": "200ms"
    },
    frontHoverStyle: {
      "background": "#6c6c6c",
      "transition": "200ms"
    },
    backStyle: {
      "background": `#4e4e4e`,
      "transition": "200ms"
    },
    backHoverStyle: {
      "background": `#4c4c4c`,
      "transition": "200ms"
    }
  }


if (window.innerWidth< 767){
  return (
    <div className="TeamForm">
        <TeamNameForm name={teamName} 
        setName={setTeamName} 
        setValidate={setValidate} 
        team={Team} 
        setTeam={setTeam} 
        setTeamNameValid={setTeamNameValid} 
        teamNameValid={teamNameValid}/>
        {teamNameValid &&       
        <ColorForm 
        teamColor={teamColor} 
        setTeamColor={setTeamColor} 
        setValidate={setValidate} 
        team={Team} 
        setTeam={setTeam} 
        setTeamColorValid={setTeamColorValid} 
        teamColorValid={teamColorValid}/>}

      {playerList.map((x, i) => {
        if (playerList.length > 1 && x.player !== "" && playerList[i+1]) {
          return (
            <Player action={e => handleRemoveClick(e, i)} i={i} player={x.player} key={i}/>
          ) 
        } return null
      })}
        {validate && <Button text={"Valider l'équipe"} action={handleValidate} ico={"fas fa-users"} style={buttonStyleGreen}/>}
        {!toogle && teamNameValid && teamColorValid && <Button text={"Ajouter un joueur"} action={tooglePlayer} ico={"fas fa-user-plus"} /> }
        {toogle && <PlayerForm list={playerList} setList={setplayerList} setToogle={setToogle}/>}
      <Button text={"Annuler"} action={handleCancel} style={buttonStyleGray}/>
    </div>
    );
  } else if(addTeam || window.innerWidth>767){
    return (
      <div className="TeamForm">
        <TeamNameForm name={teamName} 
        setName={setTeamName} 
        setValidate={setValidate} 
        team={Team} 
        setTeam={setTeam} 
        setTeamNameValid={setTeamNameValid} 
        teamNameValid={teamNameValid}/>
        { teamNameValid && <ColorForm 
        teamColor={teamColor} 
        setTeamColor={setTeamColor} 
        setValidate={setValidate} 
        team={Team} 
        setTeam={setTeam} 
        setTeamColorValid={setTeamColorValid} 
        teamColorValid={teamColorValid}/>}
        {playerList.map((x, i) => {
          if (playerList.length > 1 && x.player !== "" && playerList[i+1]) {
            return (
              <Player action={e => handleRemoveClick(e, i)} i={i} player={x.player} key={i}/>
            ) 
          } return null
        })}
          {toogle && <PlayerForm list={playerList} setList={setplayerList} setToogle={setToogle}/>}
        <div className='buttons__desktop'>
          {!toogle && teamNameValid && teamColorValid && <Button text={"Ajouter un joueur"} action={tooglePlayer} ico={"fas fa-user-plus"} /> }
          {validate && <Button text={"Valider l'équipe"} action={handleValidate} ico={"fas fa-users"} style={buttonStyleGreen}/>}
        </div>
        <Button text={"Annuler"} action={handleCancel} style={buttonStyleGray}/>
      </div>
      );
  }
}

export default TeamForm;
