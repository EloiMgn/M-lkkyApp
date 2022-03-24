import './ColorForm.scss'
import { CirclePicker  } from 'react-color';

const ColorForm = ({teamColor, setTeamColor, team, setTeam, setTeamColorValid, teamColorValid}) => {

  // handle input change
  const handleColorChange = (color) => {
    setTeamColor(color.hex);
    const newTeam = [...team]
    newTeam[0].color = color.hex
    setTeam(newTeam)
    setTeamColorValid(true)
  }

  // handle click event of the Remove button
  const handleRemoveColorClick = (e, index) => {
    setTeamColor('');
    setTeamColorValid(false)
    const newTeam = [...team]
    newTeam[0].color = ''
    setTeam(newTeam)
  };

  const pickableColors = [ 
    "#fff8d8",
    "#e2e2b9",
    "#e3ded9", 
    "#bba686", 
    "#e8d3a3",
    "#f3c58f",
    "#747c24",
    "#346830", 
    "#5d6f66",
    "#416270", 
    "#8aa4ab",
    "#6db9d5"
  ]

return (
  <div className="teamColor">
    {teamColorValid && 
    <div className='teamColor__selected'> 
      <h2>Votre couleur d'équipe</h2>
      <div className='teamColor__selected-color' style={{backgroundColor: `${teamColor}`}}></div>
      <i className="fas fa-edit teamName__deleteBtn" onClick={(e) => handleRemoveColorClick(e)}></i>
    </div>}
    {!teamColorValid && 
    <div className='teamColor__input'>
      <h2>Choisissez une couleur d'équipe</h2>
      <CirclePicker colors={pickableColors} onChangeComplete={handleColorChange}/>
    </div>}
  </div>
  )
}

export default ColorForm;
