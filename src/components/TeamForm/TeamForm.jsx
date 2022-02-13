
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import './TeamForm.scss'

const TeamForm = () => {
  const [playerList, setplayerList] = useState([{player: "", hide: false}])
  const [teamName, setTeamName] = useState([{team: "", validate: false}])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const playersNames = []
  const [Team, setTeam] = useState({name: teamName[0].name, players: playersNames, score: 0, fails: 0, playerTurn: 0, level: false})
  const [validate, setValidate] = useState(false)
  const navigate= useNavigate()
  const dispatch = useDispatch();


  // handle input change
  const handleNameChange = (e, index) => {
    const { name, value } = e.target;
    const team = [...teamName];
    team[index][name] = value;
    setTeamName(team);
    // handleInputChange(e, index)
  }

  // handle validate team Name
  const handleNameClick = (e, i) => {
    const list = [...teamName];
    list[i].validate = true
    const players = [...playerList];
    players.splice(-1, 1);
    handleNameChange(e, i)
    setTeam({name: list.team, players: players, score: 0, fails: 0, playerTurn: 0, level: false})
  }

  // handle click event of the Remove button
  const handleRemoveNameClick = (e, index) => {
    setTeamName([{team: "", validate: false}]);
    const players = [...playerList];
    players.splice(-1, 1);
    setTeam({name: "", players: playersNames, score: 0, fails: 0, playerTurn: 0, level: false})
    handleInputChange(e, index)
  };



  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...playerList];
    list[index][name] = value;
    setplayerList(list);
  }

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    const list = [...playerList];
    list.splice(index, 1);
    setplayerList(list);
    const players = [...playerList];
    players.splice(-1, 1);
    setTeam({name: `${teamName[0].team}`, players: playersNames, score: 0, fails: 0, playerTurn: 0, level: false})
  };

  // handle hide previous input on click on add player
  const handleAddPlayer = (i) => {
    playerList[i].hide = true
  }

  // handle click event of the Add button
  const handleAddClick = (i) => {
    handleAddPlayer(i)
    setplayerList([...playerList, { player: "", hide: false}]);
  };

  const handleValidate = (e) => {
    Team.players.pop()
    setTeam(Team)
    dispatch({ type: "createNewTeam", team: Team })
    navigate('/dashboard', { replace: true })
  }

  useEffect(() => {
    playerList.forEach(player => {
      playersNames.push(player.player)
      setTeam({name: teamName[0].team, players: playersNames, score: 0, fails: 0, playerTurn: 0, level: false})
    })
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [playerList])

  useEffect(() => {
      if(Team.name && Team.name !== '' && Team.players.length >= 1 && Team.players[0] && Team.players[0] !== '') {
        setValidate(true)
      } else if(!Team.name || Team.players.length < 1 || Team.name === '' || Team.players[0] === '') {
        setValidate(false)
      }
  }, [Team])

return (
  <div className="TeamForm">
      <div className="TeamForm__teamName">
          {teamName.map((x, i) => {
            if (x.validate === true) {
              return (
                <div className='TeamForm__teamName__validated'  key={i}>
                  <div className="teamName" style={{ marginBottom: 10 }} >{x.team}</div>
                  <Button elt={"teamForm"} 
                  className='teamForm__btn' 
                  text={"Modifier"} 
                  size={"small"}
                  action={(e) => handleRemoveNameClick(e, i)}/>
                </div>
              ) 
            } return null
          })}
          {teamName.map((x, i) => {
            if(!x.validate) {
              return (
                <div className="TeamForm__teamName__unvalidated" key={i}>
                  <label htmlFor="player">Entrez le nom de votre équipe</label>
                  <input
                  id="team"
                    name="team"
                    placeholder="Entrez le nom de votre équipe"
                    value={x.team}
                    onChange={e => handleNameChange(e, i)}
                    autoFocus={true}
                  />
                  <div className="btn-box">
                  {teamName.length - 1 === i && x.team !== "" &&                   
                  <Button elt={"teamForm"} 
                  className='teamForm__btn' 
                  text={"Valider"} 
                  size={"small"}
                  action={e => handleNameClick(e, i)}/>}
                  </div>
                </div>
              );
            } return null
          })}
      </div>
      <div className="TeamForm__players">
        {playerList.map((x, i) => {
          if (playerList.length > 1 && x.player !== "" && playerList[i+1]) {
            return (
              <div className={`TeamForm__player player${i+1}`}  key={i}>
                <div className="playerName">Joueur {i+1} : <strong>{x.player}</strong></div>
                <Button elt={"teamForm"} 
                  className='teamForm__btn' 
                  text={"Supprimer"} 
                  size={"small"}
                  action={(e) => handleRemoveClick(e, i)}/>
              </div>
            ) 
          } return null
        })}
        {playerList.map((x, i) => {
          if(!x.hide) {
            return (
              <div className="addPlayer__form" key={i}>
                <h3>Ajouter un joueur</h3>
                <div className="addPlayer__input">
                  <label htmlFor="player">Joueur {i+1}</label>
                  <input
                  id="player"
                    name="player"
                    placeholder=""
                    value={x.player}
                    onChange={e => handleInputChange(e, i)}
                  />
                </div>
                <div className="btn-box">
                  {playerList.length - 1 === i && x.player !== "" && 
                    <Button elt={"teamForm"} 
                    className='teamForm__btn' 
                    text={"Ajouter un joueur"} 
                    size={"small"}
                    action={e => handleAddClick(i)}/>}
                </div>
            </div>
          )}
          return null
        })}
      </div>
          <div className={validate === false ? 'hidden' : "btn-box"}>
          <Button elt={"teamForm"} 
            className='teamForm__btn' 
            text={"Valider l'équipe"} 
            size={"small"}
            action={e => handleValidate(e)}/>
          </div>
  </div>
);
}

export default TeamForm;
