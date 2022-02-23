import './Stats.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import Fireworks from '../../components/Fireworks/Fireworks';

const Stats = () => {
  const {id} = useParams();
  const state = useSelector((state) => state)
  const [localStorageAvailable, setIsLocalStorageAvailable] = useState(true)
  const dispatch = useDispatch()
  
    /**
     * Check availability to use localStorage
     */
     const isLocalStorageAvailable = () => {
      const test = 'test'
      try {
        localStorage.setItem(test, test)
        localStorage.removeItem(test)
        setIsLocalStorageAvailable(true)
      } catch (e) {
        setIsLocalStorageAvailable(false)
      }
    }
  
    useEffect(() => {
      isLocalStorageAvailable()
      const localStorage = JSON.parse(getLocalStorage())
      if (localStorageAvailable && localStorage && localStorage.state.teams.length === state.teams.length) {
        dispatch({ type: "setStateWinner"})
      }
    }, [dispatch, localStorageAvailable, state.teams.length])

    const handleRestartGame = () => {
      for (let i = 0; i < state.teams.length; i++) {
        dispatch({type: "restart", idx: i})
      }
      // check localStorage
      const rawLocalStorage = getLocalStorage()
      // si il y a quelqueChose dans le localStorage
      if (rawLocalStorage !== null) {
          removeLocalStorage()
        }
      }

    const handleStartNewGame = () => {
      dispatch({type: "startNewGame"})
      // check localStorage
      const rawLocalStorage = getLocalStorage()
      // si il y a quelqueChose dans le localStorage
      if (rawLocalStorage !== null) {
          removeLocalStorage()
        }
      }

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
    <Footer />
  </div>
)
}

export default Stats