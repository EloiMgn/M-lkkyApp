import { useParams } from 'react-router-dom';
import './PlayingDatas.scss'


const PlayingDatas = ({team}) => {
  const range=[1, 2, 3]
  const {playerId} = useParams();

  return (
  <div className='playingDatas'>
    <div className='playingDatas__data'>
      <div className='playingDatas__data-score'>
        <h3>Score:</h3>
        <p><strong>{team.score}</strong> points</p>
      </div>
      <div className='playingDatas__data-fails'>
        <p>Lancés ratés:</p>
        <div className='team__datas-failsPlaying'>
          {range.map((rangeElem) =>
            team.fails >= rangeElem ? <span key={rangeElem.toString()}>❌</span> : null
          )}
        </div>
      </div>
    </div>
    <div className='playingDatas__data__player'>
      <p>Joueur:</p>
      <div className='team__datas-playerName'>
          {team.players.map((player) => { 
            if (player === playerId) {
            return  <span key={player.toString()}>{player}</span>
            }
            return null
            } 
          )}
        </div>
    </div>
  </div>
  )
}

export default PlayingDatas