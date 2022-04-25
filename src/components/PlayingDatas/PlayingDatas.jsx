import { useParams } from 'react-router-dom';
import Cross from '../../utils/img/Vector.svg';
import PreviousAction from '../PreviousAction/PreviousAction';
import './PlayingDatas.scss';


const PlayingDatas = ({team, previousTeam}) => {
  const range=[1, 2, 3];
  const {playerId} = useParams();

  if(team){
    return (
      <>

        {previousTeam && <span> Score de l&apos;équipe précédente </span>}
        <div className='playingDatas' style={previousTeam ? {'background': 'var(--primary)'}: {'background': 'var(--secondary)'}}>
          <div className='playingDatas__player'>
            <div className='playingDatas__team__datas'>
              <p>équipe:</p>
              <span className='playingDatas__team__datas-playerName'><strong>{team.name}</strong></span>
            </div>

            {!previousTeam &&
              <>
                <div className='playingDatas__team__datas-separator'>|</div>
                <div className='playingDatas__team__datas'>
                  <p>Joueur:</p>
                  <span className='playingDatas__team__datas-playerName'>
                    {team.players.map((player) => {
                      if (player === playerId) {
                        return  <p key={player.toString()}><strong>{player}</strong></p>;
                      } return null;
                    }
                    )}
                  </span>
                </div>
              </>
            }
            {previousTeam && <>
              <div className='playingDatas__team__datas-separator'><i className="fas fa-grip-lines-vertical"></i></div>
              <div className='playingDatas__team__datas'>
                {!previousTeam && <h3 className='scoreName'>Score :</h3>}
                <p className='scoreNumber'><strong>{team.score}</strong> points</p>
                <div className='scoreFails'>
                  {range.map((rangeElem) =>
                    team.fails >= rangeElem ? <img key={rangeElem.toString()} src={Cross} alt="" /> : null
                  )}
                </div>
              </div>
            </>
            }
          </div>
          {!previousTeam &&
              <div className='playingDatas-score'>
                {!previousTeam && <h3 className='scoreName'>Score :</h3>}
                <p className='scoreNumber'><strong>{team.score}</strong> points</p>
                <div className='scoreFails'>
                  {range.map((rangeElem) =>
                    team.fails >= rangeElem ? <img key={rangeElem.toString()} src={Cross} alt="" /> : null
                  )}
                </div>
              </div>
          }
          {previousTeam && <PreviousAction/>}
        </div>
      </>
    );
  } else return null;
};

export default PlayingDatas;