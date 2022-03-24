import './Teams.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../../utils/localStorage';
import Cross from '../../utils/img/Vector.svg';


const Teams = () => {

  const range = [1, 2, 3]
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const checkIfTeams = () => {
    if (state.teams.length === 0) {
      const localStorage = JSON.parse(getLocalStorage())
      if(localStorage && localStorage.state.teams.length > 1) {
        dispatch({ type: "setState"})
      }
    }
  }

  const handleDelete = (idx)=> {
    dispatch({type: "deleteTeam", idx: idx})
  }
  checkIfTeams()


  return (
    <div id="teams" className="teams">
      {state.teams.map((team, idx) => {
        if(team.eliminated) {
          return (
            <div className={state.playing? `team__playing team__${idx} eliminated` : `team team__${idx}`} key={idx}>
            <div className='team__name'>
            <h2>{team.name}</h2>
            </div>
            <div className='team__eliminated'>
             <p>éliminé</p> 
            </div>
          </div>
          )
        } else return (
          <div className={state.playing? `team__playing team__${idx} playing` : `team team__${idx}`} key={idx} style={{backgroundColor: `${team.color}`}}>
          <div className='team__name'>
          <h2>{team.name}</h2>
          </div>
          <div className='team__datas'>
            <div className='team__datas-score'>
              <p className='team__datas-pts'>{team.score} </p>
              <p>points</p>
            </div>
            <div className='team__datas-fails'>
              {range.map((rangeElem) =>
                team.fails >= rangeElem ? <img key={rangeElem.toString()} src={Cross} alt="" />: null
              )}
            </div>
            {!state.playing && 
            <i className="fas fa-edit team__delete" onClick={e => handleDelete(idx)}></i>}
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default Teams


