import { useParams } from 'react-router-dom';
import Cross from '../../utils/img/Vector.svg';
import './PlayingDatas.scss'


const PlayingDatas = ({team, previousTeam}) => {
  const range=[1, 2, 3]
  const {playerId} = useParams();

if(team){
  return (
     <div className='playingDatas' style={previousTeam ? {'background': '#cccccc'}: {'background': '#AF8C5E'}}>
       {previousTeam && <span> Score de l'équipe précédente : <strong>{team.name}</strong></span>}
        {!previousTeam &&
        <div className='playingDatas__player'>
          <div className='playingDatas__team__datas'>
            <p>équipe:</p>
            <span className='playingDatas__team__datas-playerName'><strong>{team.name}</strong></span>
          </div>
  
          <div className='playingDatas__team__datas-separator'>|</div>
            <div className='playingDatas__team__datas'>
              <p>Joueur:</p>
              <span className='playingDatas__team__datas-playerName'>
                  {team.players.map((player) => { 
                    if (player === playerId) {
                      return  <p key={player.toString()}><strong>{player}</strong></p>
                      } return null
                    } 
                  )}
              </span>
            </div>
        </div>
        }
       <div className='playingDatas-score'>
         {!previousTeam && <h3 className='scoreName'>Score <strong>{team.name}</strong>:</h3>}
         <p className='scoreNumber'><strong>{team.score}</strong> points</p>
         <div className='scoreFails'>
           {range.map((rangeElem) =>
             team.fails >= rangeElem ? <img key={rangeElem.toString()} src={Cross} alt="" /> : null
           )}
         </div>
     </div>
   </div>
   )
  } else return null
}

export default PlayingDatas