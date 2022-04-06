import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Cross from '../../utils/img/Vector.svg';
import { getLocalStorage } from '../../utils/localStorage';
import Modale from '../Modale/Modale';
import './Teams.scss';


const Teams = () => {

  const range = [1, 2, 3];
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [clickedTeam, setClickedTeam]= useState(null);

  const checkIfTeams = () => {
    if (state.teams.length === 0) {
      const localStorage = JSON.parse(getLocalStorage());
      if(localStorage && localStorage.state.teams.length > 1) {
        dispatch({ type: 'setState'});
      }
    }
  };

  const handleDelete = (idx)=> {
    dispatch({type: 'deleteTeam', idx: idx});
  };
  checkIfTeams();

  const showTeamDetails = (idx) =>{
    setClickedTeam(idx);
  }
  
  useEffect(() => {
    setModal(true)
  }, [clickedTeam]);

  useEffect(() => {
    setModal(false)
  }, [window.location.pathname]);

  return (
    <div id="teams" className="teams">
      {modal && <Modale title={state.teams[clickedTeam].name} text={state.teams[clickedTeam].players} setModal={setModal} listTitle='Joueurs' />}
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
          );
        } else return (
          <div className={state.playing? `team__playing team__${idx} playing` : `team team__${idx}`} key={idx} style={{backgroundColor: `${team.color}`}} onClick={() => showTeamDetails(idx)}>
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
              {!state.playing && !state.randomTeams && <button className='team__delete' onClick={() => handleDelete(idx)}><i className="fas fa-edit " ></i></button>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Teams;
