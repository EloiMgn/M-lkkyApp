import { CirclePicker } from 'react-color';
import './ColorForm.scss';

const ColorForm = ({teamColor, setTeamColor, team, setTeam, setTeamColorValid, teamColorValid}) => {

  // handle input change
  const handleColorChange = (color) => {
    setTeamColor(color.hex);
    const newTeam = [...team];
    newTeam[0].color = color.hex;
    setTeam(newTeam);
    setTeamColorValid(true);
  };

  // handle click event of the Remove button
  const handleRemoveColorClick = () => {
    setTeamColor('');
    setTeamColorValid(false);
    const newTeam = [...team];
    newTeam[0].color = '';
    setTeam(newTeam);
  };

  const pickableColors = [
    '#12CBC4', // light-blue
    '#00A8C5', // blue
    '#0652DD',
    '#009432', //dark-green
    '#C4E538', //light-green
    '#FFC312', // yellow
    '#F79F1F', // dark-yellow
    '#EE5A24', //orange
    '#EA2027', //red
    '#E81D62', // pink
    '#ED4C67',
    '#FDA7DF', //light-pink
  ];

  return (
    <div className="teamColor">
      {teamColorValid &&
    <div className='teamColor__selected'>
      <h2>Votre couleur d&apos;équipe</h2>
      <div className='teamColor__selected-color' style={{backgroundColor: `${teamColor}`}}></div>
      <button onClick={handleRemoveColorClick} className='teamName__deleteBtn'><i className="fas fa-edit"></i></button>
    </div>}
      {!teamColorValid &&
    <div className='teamColor__input'>
      <h2>Choisissez une couleur d&apos;équipe</h2>
      <CirclePicker colors={pickableColors} onChangeComplete={handleColorChange}/>
    </div>}
    </div>
  );
};

export default ColorForm;
