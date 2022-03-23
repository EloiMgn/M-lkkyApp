import './Stats.scss'
import { useSelector } from 'react-redux';
import Title from '../../components/Title/Title';


const Stats = () => {
const state = useSelector((state) => state)

return (
    <main className='Stats__content'>
    <Title text={'Statistiques de la partie'}/>
    {state.teams.map((team, i) => {
        return (
          <div className='Stats__content__team' key={i}>
              {team.stats.map((player, i) => {
                  return (
                    <div className={team.eliminated ? 'playerStats__eliminated' : 'playerStats'} key={i}>
                      <div className='playerStats__name'>{player.player}:</div>
                      <div className='playerStats__data'>
                        <div className='playerStats__data__score'>
                          <h3>Score</h3>
                          <div >{player.score}</div>
                        </div>
                        <div className='playerStats__data__fails'>
                          <h3>Lancés ratés</h3>
                          <div>{player.fails}</div>
                        </div>
                        {state.options.elimination &&
                          <div className='playerStats__data__fails'>
                            <h3>Eliminé ?</h3>
                            {team.eliminated ? <div>Oui</div>: <div>Non</div>}
                          </div>
                        }
                      </div>
                    </div>
                  )
                })
              }
          </div>
        )}
      )}
     </main> 
)
}

export default Stats