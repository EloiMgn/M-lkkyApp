import './TeamNameForm.scss';

const TeamNameForm = ({name, setName,  team, setTeam, setTeamNameValid, teamNameValid}) => {


  // handle input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // handle validate team Name
  const handleNameClick = (e) => {
    if (e.target.value.length > 0) {
      const newTeam = [...team];
      newTeam[0].name = name;
      setTeam(newTeam);
      setTeamNameValid(true);
    }
  };

  // handle validate team Name
  const handleNameEnter = (e) => {
    if (e.target.value.length > 0 && e.key === 'Enter') {
      const newTeam = [...team];
      newTeam[0].name = name;
      setTeam(newTeam);
      setTeamNameValid(true);
    }
  };

  // handle click event of the Remove button
  const handleRemoveNameClick = () => {
    setName('');
    setTeamNameValid(false);
    const newTeam = [...team];
    newTeam[0].name = '';
    setTeam(newTeam);
  };

  return (
    <div className="teamName">
      {teamNameValid &&
          <div className='teamName__validated'>
            <button onClick={handleRemoveNameClick} className='teamName__deleteBtn'><i className="fas fa-edit"></i></button>
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
                placeholder="Entrez le nom du joueur"
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
  );
};

export default TeamNameForm;
