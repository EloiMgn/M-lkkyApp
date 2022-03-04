import './Player.scss'
import Cross from '../../utils/img/Vector.svg';

const Player = ({player, i}) => {

    // handle click event of the Remove button
    const handleRemoveClick = (e, index) => {
      // const list = [...playerList];
      // list.splice(index, 1);
      // setplayerList(list);
      // const players = [...playerList];
      // players.splice(-1, 1);
      // setTeam({name: teamName, players: playersNames, score: 0, fails: 0, playerTurn: 0, level: false, stats:[], eliminated: false})
    };
  
return (
  <div className={`TeamForm__player player${i+1}`}  key={i}>
    <div className="playerName">Joueur {i+1} : <strong>{player}</strong></div>
    <img src={Cross} alt="" className='teamForm__btn deleteBtn' onClick={(e) => handleRemoveClick(e, i)}/>
  </div>
  )
}

export default Player;
