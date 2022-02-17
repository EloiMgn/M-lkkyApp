import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';
import './Game.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
// import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
// import { isToday, localStorageDateToNewDate } from '../../utils/tools'
import { useDispatch } from 'react-redux';
// import { calculateScore } from '../../utils/tools';
import { setLocalStorage } from '../../utils/localStorage';
import { checkIfEqual, checkWinner, setLevel } from '../../utils/tools';
import Skittles from '../../components/Skittles/Skittles';

const Game = () => {
  const {id, playerId} = useParams();
  const state = useSelector((state) => state)
  const navigate= useNavigate()

  const range = [1, 2, 3]
  const dispatch = useDispatch()

  useEffect(() => {
    if (state.teams.length > 1) {
      setLocalStorage({ date: new Date(), state })
    } else if (state.teams.length <= 1) {
      dispatch({ type: "setState"})
    }
  }, [dispatch, id, state])

  const handleResetSkittles = () => {
    dispatch({type: "resetSkittles"})
  }

  const handleNextTeam = (i)  => {
    dispatch({ type: "nextTeam", currentTeam: i })
    dispatch({type: "nextPlayer", team: parseInt(id)})
    calculateScore(playerId, id)
    handleResetSkittles()
  }

  const handleNextFirstTeam = (i)  => {
    dispatch({ type: "firstTeam", currentTeam: i })
    dispatch({type: "nextPlayer", team: parseInt(id)})
    calculateScore(playerId, id)
    handleResetSkittles()
  }

  const calculateScore = (player, id) => {
    const falledSkittle = []
    state.skittles.forEach(skittle => {
      if (skittle.value === true) {
        falledSkittle.push(skittle)
      }
    })
    if (falledSkittle.length === 0) {
      dispatch({type: "fail", team: id, player: player})
    }
    if (falledSkittle.length === 1) {
      dispatch({type: "scored", score: falledSkittle[0].id, team: id, player: player})
      dispatch({type: "unFail", team: id})
    }
    if (falledSkittle.length > 1) {
      dispatch({type: "scored", score: falledSkittle.length, team: id, player: player})
      dispatch({type: "unFail", team: id})
    }
  }

  useEffect(() => {
    // si équipe 1 affichée et plus de 2 équipes total
    if(parseInt(id) === 1 && state.teams.length > 2) {
      const score = state.teams[state.teams.length-1].score
      const fails = state.teams[state.teams.length-1].fails

      for (let i = 0; i < state.teams.length; i++) {
        if(checkIfEqual(state.teams, score, state.teams.length-1) === state.teams[i]){
          dispatch({type: "resetScore", team: i})
        }
      }
      if (checkWinner(score)) {
        dispatch({type: "setWinner", team: state.teams.length-1})
        navigate(`/winner/${state.teams.length-1}`, { replace: true })
      }
      if(setLevel(score)) {
        dispatch({type: "setLevel", team: state.teams.length-1})
      }
      if(fails === 3 || score > 50) {
        dispatch({type: "resetScore", team: state.teams.length-1})
      }
    } 

    // si équipe 1 affichée et 2 équipes total
    else if (parseInt(id) === 1 && state.teams.length === 2) {
      const score = state.teams[parseInt(id)].score
      const fails = state.teams[parseInt(id)].fails

      for (let i = 0; i < state.teams.length; i++) {
        if(checkIfEqual(state.teams, score, parseInt(id)) === state.teams[i]){
          dispatch({type: "resetScore", team: i})
        }
      }
      if (checkWinner(score)) {
        dispatch({type: "setWinner", team: parseInt(id)})
        navigate(`/winner/${parseInt(id)}`, { replace: true })
      }
      if(setLevel(score)) {
        dispatch({type: "setLevel", team: parseInt(id)})
      }
      if(fails === 3 || score > 50) {
        dispatch({type: "resetScore", team: parseInt(id)})
      }
    }

    // si équipe 2 affichée et 2 équipes total
      else if (parseInt(id) === 2 && state.teams.length === 2) {
        const score = state.teams[parseInt(id)-2].score
        const fails = state.teams[parseInt(id)-2].fails

        for (let i = 0; i < state.teams.length; i++) {
          if(checkIfEqual(state.teams, score, parseInt(id)-2) === state.teams[i]){
            dispatch({type: "resetScore", team: i})
          }
        }
        if (checkWinner(score)) {
          dispatch({type: "setWinner", team: parseInt(id)-2})
          navigate(`/winner/${parseInt(id)-2}`, { replace: true })
        }
        if(setLevel(score)) {
          dispatch({type: "setLevel", team: parseInt(id)-2})
        }
        if(fails === 3 || score > 50) {

          dispatch({type: "resetScore", team: parseInt(id)-2})
        }
    } 
    // si équipe plus de 1 affichée et plus de 2 équipes total
    else if (parseInt(id) > 1 && state.teams.length > 2){
      const score = state.teams[parseInt(id)-2].score
      const fails = state.teams[parseInt(id)-2].fails

      //si le score précédent égalise le score d'une autre équipe
      for (let i = 0; i < state.teams.length; i++) {
        if(checkIfEqual(state.teams, score, parseInt(id)-2) === state.teams[i]){
          dispatch({type: "resetScore", team: i})
        }
      }
      // vérifie si la partie a un gagnant 
      if (checkWinner(score)) {
        dispatch({type: "setWinner", team: parseInt(id)-2})
        navigate(`/winner/${parseInt(id)-2}`, { replace: true })
      }
      // vérifie si le palier de 25 points est atteint
      if(setLevel(score)) {
        dispatch({type: "setLevel", team: parseInt(id)-2})
      }
      //vérifie si les 3 lancés raté sont atteints ou si 50 points sont dépassés et restaure le score au palier précédent le cas échéant
      if(fails === 3 || score > 50) {
        dispatch({type: "resetScore", team: parseInt(id)-2})
      }
    }
  }, [id])

  useEffect(() => {
    if (state.winner){
      dispatch({type: "setWinner", team: parseInt(id)-2})
      navigate(`/winner/${state.winner}`, { replace: true })
    }
  }, [])

  console.log(state);
  return (
    <div id="Game" className="Game">
      <Header/>
      <main className='Game__content'>
        {state.teams.map((team, i) => {
          if ((i+1).toString() === id) {
            return (
            <div className={`team${i+1} Game__content__body`} key={i}>
              <h2>{team.name}</h2>
                <Skittles/>
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
                  {i+1 === state.teams.length && <Button elt={"Game"} text='Equipe suivante' size={"medium"} link={`/game/${state.teams[0].name}/1/${state.teams[0].players[state.teams[0].playerTurn]}`} action={() => handleNextFirstTeam(i)} />}
                  {i+1 < state.teams.length && <Button elt={"Game"} text='Equipe suivante' size={"medium"} link={`/game/${state.teams[i+1].name}/${i + 2}/${state.teams[i+1].players[state.teams[i+1].playerTurn]}`} action={() => handleNextTeam(i)} />}
                  {2 > state.teams.length > i+2 && <Button elt={"Game"} text='Equipe suivante' size={"medium"} link={`/game/${state.teams[i+1].name}/${i + 2}/${state.teams[i+1].players[state.teams[i+1].playerTurn]}`} action={() => handleNextTeam(i)} />}
            </div>
            )
          } 
          return null
        })}
      </main>
      <Footer/>
    </div>
  )
}

export default Game