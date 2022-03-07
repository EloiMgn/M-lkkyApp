import { useEffect, useState } from 'react';
import './TeamNameForm.scss'

const TeamNameForm = ({name, setName, setValidate, team, setTeam}) => {
  const [teamNameValid, setTeamNameValid] = useState(false)
 

  // handle input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  // handle validate team Name
  const handleNameClick = (e) => {
    if (e.target.value.length > 0) {
    const newTeam = [...team]
    newTeam[0].name = name
    setTeam(newTeam)
    setTeamNameValid(true)
    }
  }

    // handle validate team Name
    const handleNameEnter = (e) => {
      if (e.target.value.length > 0 && e.key === "Enter") {
      const newTeam = [...team]
      newTeam[0].name = name
      setTeam(newTeam)
      setTeamNameValid(true)
      }
    }

  // handle click event of the Remove button
  const handleRemoveNameClick = (e, index) => {
    setName('');
    setTeamNameValid(false)
    const newTeam = [...team]
    newTeam[0].name = ''
    setTeam(newTeam)
  };

  useEffect(() => {
    if(teamNameValid) {
      setValidate(true)
    } else if(!teamNameValid) {
      setValidate(false)
    }
}, [setValidate, teamNameValid])

return (
<div className="teamName">
          {teamNameValid &&
          <div className='teamName__validated'>
            <i className="fas fa-edit teamName__deleteBtn" onClick={(e) => handleRemoveNameClick(e)}></i>
            <div style={{display: 'flex'}}>
              <h2>Nom:</h2>
              <h2 className="teamName__name"><strong>{name}</strong></h2>
            </div>
          </div>}
          {!teamNameValid &&                 
          <div className="teamName__unvalidated">
            {/* <label htmlFor="team">Entrez le nom de votre équipe</label> */}
            <div className='teamName__unvalidated__row'>
              <input
                id="team"
                name="team"
                placeholder="Entrez le nom de votre équipe"
                onChange={e => handleNameChange(e)}
                onBlur={e => handleNameClick(e)}
                onKeyPress={e => handleNameEnter(e)}
                autoFocus={true}
                value={name}
              />
              {name.length > 0 && <button className='teamName__btn teamBtn' onClick={e => handleNameClick(e)}>Valider</button>}
            </div>
          </div>}
      </div>
  )
}

export default TeamNameForm;


