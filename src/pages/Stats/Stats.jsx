import './Stats.scss'
import Header from '../../components/Header/Header'
import { useSelector } from 'react-redux';


const Stats = () => {
const state = useSelector((state) => state)

return (
  <div id="Stats" className="Stats">
    <Header/>
    <main className='Stats__content'>
    {state.teams.map((team, i) => {
        return (
          <div className='Stats__content__team' key={i}>
            <h1>{team.name}</h1>
              {team.stats.map((player, i) => {
                  return (
                    <div className='playerStats' key={i}>
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
                      </div>
                    </div>
                  )
                })
              }
          </div>
        )}
      )}
      </main> 
  </div>
)
}

export default Stats