import './Teams.scss'
import Cancel from '../../utils/img/cancel.png'
import { useSelector } from 'react-redux';

const Teams = () => {
  const teams = useSelector((state) => state.teams)
  const range = [1, 2, 3]
  return (
    <div id="teams" className="teams">
      {teams.map((team, idx) => {
        return (<div className={`team team__${idx}`} key={idx}>
          <div className='team__name'>
          <h2>{team.name}</h2>
          </div>
          <div className='team__datas'>
            <div className='team__datas-score'>
              <p className='team__datas-pts'>{team.score}</p>
              <p>points</p>
            </div>
            <div className='team__datas-fails'>
              {range.map((rangeElem) =>
                team.fails >= rangeElem ? <span key={rangeElem.toString()}>❌</span> : null
              )}
            </div>
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default Teams


// ↓↓↓↓ credits for cancel icon to add in the credit page ↓↓↓↓

{/* <a href="https://www.flaticon.com/free-icons/cancel" title="cancel icons">Cancel icons created by Freepik - Flaticon</a> */}


// mocked teams card for update style of team cards 


{/* <div className={`team team__1`} key='1'>
<div className='team__name'>
<h2>Equipe 1</h2>
</div>
<div className='team__datas'>
  <div className='team__datas-score'>
    <p className='team__datas-pts'>45</p>
    <p>points</p>
  </div>
  <div className='team__datas-fails'>
    {range.map((rangeElem) =>
        3 >= rangeElem ? <span key={rangeElem.toString()}>☀️</span> : null
    )}
  </div>
</div>
</div>

<div className={`team team__2`} key='2'>
<div className='team__name'>
<h2>Equipe 2</h2>
</div>
<div className='team__datas'>
  <div className='team__datas-score'>
    <p className='team__datas-pts'></p>
    <p>points</p>
  </div>
  <div className='team__datas-fails'>
    {range.map((rangeElem) =>
        2 >= rangeElem ? <span key={rangeElem.toString()}>☀️</span> : null
    )}
  </div>
</div>
</div> */}