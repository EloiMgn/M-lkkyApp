
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import './TeamForm.scss'

const TeamForm = () => {
  const [playerList, setplayerList] = useState([{player: "", hide: false}])
  const [teamName, setTeamName] = useState("")
  const [teamNameValid, setTeamNameValid] = useState(false)
  const playersNames = []
  const [Team, setTeam] = useState({name: teamName, players: playersNames, score: 0, fails: 0, playerTurn: 0, level: false, stats:[]})
  const [validate, setValidate] = useState(false)
  const navigate= useNavigate()
  const dispatch = useDispatch();


  // handle input change
  const handleNameChange = (e) => {
    setTeamName(e.target.value);
  }

  // handle validate team Name
  const handleNameClick = () => {
    const players = [...playerList];
    players.splice(-1, 1);
    setTeam({name: teamName, players: players, score: 0, fails: 0, playerTurn: 0, level: false, stats:[]})
    setTeamNameValid(true)
  }

  // handle click event of the Remove button
  const handleRemoveNameClick = (e, index) => {
    setTeamName('');
    setTeamNameValid(false)
    const players = [...playerList];
    players.splice(-1, 1);
    setTeam({name: "", players: players, score: 0, fails: 0, playerTurn: 0, level: false, stats:[]})
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
    setTeam({name: teamName, players: playersNames, score: 0, fails: 0, playerTurn: 0, level: false, stats:[]})
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
    if (Team.players.length === 0){
      Team.players.push(Team.name)
      setTeam(Team)
      dispatch({ type: "createNewTeam", team: Team })
      navigate('/dashboard', { replace: true })
    } else if (Team.players.length > 0) {
      setTeam(Team)
      dispatch({ type: "createNewTeam", team: Team })
      navigate('/dashboard', { replace: true })
    }
  }

  useEffect(() => {
    playerList.forEach(player => {
      playersNames.push(player.player)
      setTeam({name: teamName, players: playersNames, score: 0, fails: 0, playerTurn: 0, level: false, stats:[]})
    })
}, [playerList])

  useEffect(() => {
      if(teamNameValid) {
        setValidate(true)
      } else if(!teamNameValid) {
        setValidate(false)
      }
  }, [teamNameValid])

return (
  <div className="TeamForm">
      <div className="TeamForm__teamName">
          {teamNameValid &&
          <div className='TeamForm__teamName__validated'>
            <h2 className="teamName" style={{ marginBottom: 10 }} >{teamName}</h2>
            <button className='teamForm__btn playerBtn' onClick={(e) => handleRemoveNameClick(e)}>Modifier</button>
          </div>}
          {!teamNameValid &&                 
          <div className="TeamForm__teamName__unvalidated">
                  <label htmlFor="player">Entrez le nom de votre équipe</label>
                  <div className='TeamForm__teamName__unvalidated__row'>
                    <input
                    id="team"
                      name="team"
                      placeholder="Entrez le nom de votre équipe"
                      onChange={e => handleNameChange(e)}
                      autoFocus={true}
                      value={teamName}
                      className={teamName.length > 0? 'inputSmall' : 'inputBig'}
                    />
                    {teamName.length > 0 && <button className='teamForm__btn teamBtn' onClick={e => handleNameClick(e)}>Valider</button>}
                  </div>
                </div>
          }
      </div>
      <div className="TeamForm__players">
        {playerList.map((x, i) => {
          if (playerList.length > 1 && x.player !== "" && playerList[i+1]) {
            return (
              <div className={`TeamForm__player player${i+1}`}  key={i}>
                <div className="playerName">Joueur {i+1} : <strong>{x.player}</strong></div>
                <button className='teamForm__btn playerBtn' onClick={(e) => handleRemoveClick(e, i)}>Supprimer</button>
              </div>
            ) 
          } return null
        })}
        {playerList.map((x, i) => {
          if(!x.hide) {
            return (
              <div className="addPlayer__form" key={i}>
                <h3>Ajouter un joueur</h3>
                <div className='addPlayer'>
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
                    {playerList.length - 1 === i && x.player !== "" && <button className='teamForm__btn'  onClick={e => handleAddClick(i)}>OK</button>}
                  </div>
                </div>
            </div>
          )}
          return null
        })}
      </div>
        {validate && <button className='teamForm__btn' onClick={e => handleValidate(e)}>Valider l'équipe</button>}
  </div>
);
}

export default TeamForm;
