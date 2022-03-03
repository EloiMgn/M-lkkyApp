import './Stats.scss'
import Header from '../../components/Header/Header'
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';


const Stats = () => {
const state = useSelector((state) => state)

return (
  <div id="Stats" className="Stats">
    <Header/>
    <main className='Stats__content'>
      <h2>équipes gagnantes</h2>
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
       <h2>équipes éliminées</h2>
    {state.eliminatedTeams.map((team, i) => {
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
      <Footer/>
  </div>
)
}

export default Stats