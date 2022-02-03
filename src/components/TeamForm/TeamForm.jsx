
import { useState, useContext } from 'react'
// import { setLocalStorage } from '../../utils/localStorage'
import { Store } from '../../utils/Provider/Provider'
import { useNavigate } from 'react-router'
import './TeamForm.scss'

const TeamForm = () => {
  const [playerList, setplayerList] = useState([{player: "", hide: false}])
  const [teamName, setTeamName] = useState([{team: "", validate: false}])
  const [Team, setTeam] = useState([{id: 0, name: teamName[0].name, players: playerList}])
  const { addTeam } = useContext(Store)
  const navigate= useNavigate()
  // const Team = [{
  //   "id": 0,
  //   "name": teamName[0].team,
  //   "players": playerList
  // }]

  // handle input change
  const handleNameChange = (e, index) => {
    const { name, value } = e.target;
    const team = [...teamName];
    team[index][name] = value;
    setTeamName(team);
  }

  // handle validate team Name
  const handleNameClick = (e, i) => {
    const list = [...teamName];
    list[i].validate = true
    handleNameChange(e, i)
  }

    // handle click event of the Remove button
    const handleRemoveNameClick = () => {
      setTeamName([{team: "", validate: false}]);
    };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...playerList];
    list[index][name] = value;
    setplayerList(list);
  }
  // handle hide previous input on click on add player
  const handleAddPlayer = (e, i) => {
    const list = [...playerList];
    list[i].hide = true
    setTeam([{id: 0, name: `${teamName[0].team}`, players: playerList}])
    // console.log(Team);
  }

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...playerList];
    list.splice(index, 1);
    setplayerList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (e, i) => {
    handleAddPlayer(e, i)
    setplayerList([...playerList, { player: "", hide: false}]);
  };

  const handleValidate = () => {
    setTeam([{id: 0, name: teamName[0].name, players: playerList}])
    addTeam(Team)
    // navigate('/Dashboard', { replace: true })
  }

return (
  <div className="TeamForm">
    {Team.map((teamX, i) => {
      console.log(teamX);
      return (
      <div key={i}>
      <div className="TeamForm__teamName">
          {teamName.map((x, i) => {
            if (x.validate === true) {
              return (
                <div className={`TeamForm__player player${i+1}`}  key={i}>
                  <div className="playerName" style={{ marginBottom: 10 }} >{x.team}</div>
                  <button className="mr10" onClick={() => handleRemoveNameClick(i)}>Modifier</button>
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
                <button className="mr10" onClick={() => handleRemoveClick(i)}>Supprimer</button>
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
                  />
                </div>
                <div className="btn-box">
                  {playerList.length - 1 === i && x.player !== "" && <button onClick={e => handleAddClick(e, i)}>Ajouter un joueur</button>}
                </div>
            </div>
          )}
          return null
        })}
      </div>
      <div className="btn-box">
        {teamX.players.length > 1  && teamX.name !== "" &&  <button onClick={handleValidate}>Valider l'équipe</button>}
      </div>
    </div>
    )
    })}
  </div>
);
}

export default TeamForm;
