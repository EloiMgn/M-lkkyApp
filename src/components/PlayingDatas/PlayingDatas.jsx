import { useParams } from 'react-router-dom';
import Cross from '../../utils/img/Vector.svg';
import './PlayingDatas.scss'


const PlayingDatas = ({team, previousTeam}) => {
  const range=[1, 2, 3]
  const {playerId} = useParams();

  return (
  <div className='playingDatas'>
      {previousTeam? 
        <div >
          <h2>Score de l'équipe précédente</h2>
        </div>
        :
        <div className='playingDatas__data__player'>
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
    <div className='playingDatas__data'>

      <div className='playingDatas__data-score'>
        <h3 className='scoreName'>Score <strong>{team.name}</strong>:</h3>
        <p className='scoreNumber'><strong>{team.score}</strong> points</p>
        <div className='scoreFails'>
          {range.map((rangeElem) =>
            team.fails >= rangeElem ? <img key={rangeElem.toString()} src={Cross} alt="" /> : null
          )}
        </div>
      </div>

      {/* <div className='playingDatas__data-score'>
        <h3 className='scoreName'>Score <span>{previousTeam.name}</span>:</h3>
        <p className='scoreNumber'><strong>{previousTeam.score}</strong> points</p>
        <div className='scoreFails'>
          {range.map((rangeElem) =>
            previousTeam.fails >= rangeElem ? <img key={rangeElem.toString()} src={Cross} alt="" /> : null
          )}
        </div>
      </div> */}
    </div>
  </div>
  )
}

export default PlayingDatas