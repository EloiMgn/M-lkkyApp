
import { useEffect, useState, useContext } from 'react'
// import { setLocalStorage } from '../../utils/localStorage'
import { Store } from '../../utils/Provider/Provider'
import { useNavigate } from 'react-router'
import './TeamForm.scss'

const TeamForm = () => {
  const [playerList, setplayerList] = useState([{player: "", hide: false}])
  const [teamName, setTeamName] = useState([{team: "", validate: false}])
  const playersNames=[]
  const [Team, setTeam] = useState({id: 0, name: teamName[0].name, players: playersNames})
  const [validate, setValidate] = useState(false)
  const { addTeam } = useContext(Store)
  const navigate= useNavigate()


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
    setTeam({id: 0, name: list.team, players: playersNames})
  }

  // handle click event of the Remove button
  const handleRemoveNameClick = (e, index) => {
    setTeamName([{team: "", validate: false}]);
    const players = [...playerList];
    players.splice(-1, 1);
    setTeam({id: 0, name: "", players: playersNames})
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
    setTeam({id: 0, name: `${teamName[0].team}`, players: playersNames})
  };

  // handle hide previous input on click on add player
  const handleAddPlayer = (i) => {
    playerList[i].hide = true
    setTeam({id: 0, name: `${teamName[0].team}`, players: playersNames})
  }

  // handle click event of the Add button
  const handleAddClick = (i) => {
    handleAddPlayer(i)
    setplayerList([...playerList, { player: "", hide: false}]);
  };

  const handleValidate = (e) => {
    console.log(e);
    const list = [...playerList];
    list.splice(-1, 1);
    setTeam({id: 0, name: teamName[0].team, players: playersNames})
    addTeam(Team)
    navigate('/Dashboard', { replace: true })
  }

  useEffect(() => {
    playerList.forEach(player => {
      playersNames.push(player.player)
    })
}, [playerList])

  useEffect(() => {
      if(Team.name !== "" && Team.players.length >= 1 && Team.players[0].player !== '') {
        setValidate(true)
      } else if(Team.name === '' || Team.players.length < 1) {
        setValidate(false)
      }
  }, [Team])

return (
  <div className="TeamForm">
      <div className="TeamForm__teamName">
          {teamName.map((x, i) => {
            if (x.validate === true) {
              return (
                <div className={`TeamForm__player player${i+1}`}  key={i}>
                  <div className="playerName" style={{ marginBottom: 10 }} >{x.team}</div>
                  <button className="mr10" onClick={(e) => handleRemoveNameClick(e, i)}>Modifier</button>
                </div>
              ) 
            } return null
          })}
          {teamName.map((x, i) => {
            if(!x.validate) {
              return (
                <div className="box" key={i}>
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
                  {teamName.length - 1 === i && x.team !== "" && <button onClick={e => handleNameClick(e, i)}>Valider</button>}
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
                <div className="playerName" style={{ marginBottom: 10 }} >Joueur {i+1} : {x.player}</div>
                <button className="mr10" onClick={(e) => handleRemoveClick(e, i)}>Supprimer</button>
              </div>
            ) 
          } return null
        })}
        {playerList.map((x, i) => {
          if(!x.hide) {
            return (
              <div className="box" key={i}>
                <div >
                  <h3 className="">Ajouter un joueur</h3>
                  <label htmlFor="player">Joueur {i+1}</label>
                  <input
                  id="player"
                    name="player"
                    placeholder=""
                    value={x.player}
                    onChange={e => handleInputChange(e, i)}
                    // autoFocus={true}
                  />
                </div>
                <div className="btn-box">
                  {playerList.length - 1 === i && x.player !== "" && <button onClick={e => handleAddClick(i)}>Ajouter un joueur</button>}
                </div>
            </div>
          )}
          return null
        })}
      </div>
          <div className="btn-box">
            <button onClick={e => handleValidate(e)} className={validate === false ? 'hidden' : 'show'}>Valider l'équipe</button>
          </div>
  </div>
);
}

export default TeamForm;
