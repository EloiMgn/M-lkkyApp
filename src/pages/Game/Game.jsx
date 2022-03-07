import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';
import './Game.scss'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'

import { useDispatch } from 'react-redux';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { checkIfEqual, checkWinner, setLevel } from '../../utils/tools';
import Skittles from '../../components/Skittles/Skittles';
import PlayingDatas from '../../components/PlayingDatas/PlayingDatas';
import Footer from '../../components/Footer/Footer';

const Game = () => {
  const {id, playerId} = useParams();
  const state = useSelector((state) => state)
  const navigate= useNavigate()
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

  const goNext = (i) => {
    dispatch({ type: "nextTeam", currentTeam: i })
    dispatch({type: "nextPlayer", team: parseInt(id)})
    calculateScore(playerId, id)
    handleResetSkittles()
    navigate(`/game/${state.teams[i+1].name}/${i + 2}/${state.teams[i+1].players[state.teams[i+1].playerTurn]}`, { replace: true })
  }

  const handleNextTeam = (i)  => {
    if(!state.options.elimination) {
      goNext(i)
    } else if (state.options.elimination) {
      for (let j = 0; j < state.teams.length; j++) {
        if(!state.teams[i+1].eliminated) {
          goNext(i)
          break
        } else if(state.teams[i+1].eliminated && !state.teams[j+1].eliminated){
          goNext(j+1)
          break
        } 
        // console.log(state.teams[j]);
        // if(!state.teams[i+1].eliminated) {
        //   goNext(i)
        // } else if (state.teams[i+1].eliminated) {
        //   if(i+2 < state.teams.length) {
        //   goNext(i+1)
        //   }
        // }
      }

    }
  }

  const handleNextFirstTeam = (i)  => {
    if(state.options.elimination) {
      for (let i = 0; i < state.teams.length; i++) {
        if(!state.teams[i].eliminated) {
            navigate(`/game/${state.teams[i].name}/${i+1}/${state.teams[i].players[state.teams[i].playerTurn]}`, { replace: true })
            dispatch({ type: "firstTeam", currentTeam: i })
            dispatch({type: "nextPlayer", team: parseInt(id)})
            handleResetSkittles()
            calculateScore(playerId, id)
            break
        }
      }
    } else {
      dispatch({ type: "firstTeam", currentTeam: i })
      dispatch({type: "nextPlayer", team: parseInt(id)})
      calculateScore(playerId, id)
      handleResetSkittles()
      navigate(`/game/${state.teams[0].name}/1/${state.teams[0].players[state.teams[0].playerTurn]}`, { replace: true })
    }

    // // si team1 éliminée on passe à team2
    // if(state.teams[0].eliminated){
    //   navigate(`/game/${state.teams[1].name}/1/${state.teams[1].players[state.teams[1].playerTurn]}`, { replace: true })
    // } 
    // // si team1 pas éliminée on passe à team1
    // else if (!state.teams[0].eliminated) {
    // }
  }

  // const handlePreviousTeam = (i)  => {
  //   dispatch({ type: "previousTeam", currentTeam: i })
  //   dispatch({type: "previousPlayer", team: parseInt(id)})
  //   // calculateScore(playerId, id)
  //   handleResetSkittles()
  // }

  // const handlePreviousLastTeam = (i)  => {
  //   dispatch({ type: "lastTeam", currentTeam: i })
  //   dispatch({type: "previousPlayer", team: parseInt(id)})
  //   // calculateScore(playerId, id)
  //   handleResetSkittles()
  // }

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
    if (checkWinner(score, state.teams)) {
      console.log('mince');
      dispatch({type: "setWinner", team: checkWinner(score, state.teams).playingTeams[0]})
      navigate(`/winner/${checkWinner(score, state.teams).playingTeams[0]}`, { replace: true })
    }
    if(setLevel(score)) {
      dispatch({type: "setLevel", team: state.teams.length-1})
    }
    if(fails === 3 || score > 50) {
      dispatch({type: "resetScore", team: state.teams.length-1})
    }
    if(fails === 3 && state.options.elimination) {
      dispatch({type: "eliminateTeam", team: state.teams[state.teams.length-1], teamId: state.teams.length-1})
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
    if (checkWinner(score, state.teams)) {
      console.log('zut');
      dispatch({type: "setWinner", team: checkWinner(score, state.teams).playingTeams[0]})
      navigate(`/winner/${checkWinner(score, state.teams).playingTeams[0]}`, { replace: true })
    }
    // vérifie si le pallier de 25 points est atteint
    if(setLevel(score)) {
      dispatch({type: "setLevel", team: parseInt(id)-2})
    }
    //vérifie si les 3 lancés raté sont atteints ou si 50 points sont dépassés et restaure le score au palier précédent le cas échéant
    if(fails === 3 || score > 50) {
      dispatch({type: "resetScore", team: parseInt(id)-2})
    }
    if(fails === 3 && state.options.elimination) {
      dispatch({type: "eliminateTeam", team: state.teams[parseInt(id)-2], teamId: parseInt(id)-2})
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
    if (checkWinner(score, state.teams)) {  
      for (let i = 0; i < checkWinner(score, state.teams).playingTeams.length; i++) {
        if(checkWinner(score, state.teams).playingTeams[i].score === 50){
          dispatch({type: "setWinner", team: i})
          navigate(`/winner/${i}`, { replace: true })
        } 
      }
    }
    if(setLevel(score)) {
      dispatch({type: "setLevel", team: parseInt(id)})
    }
    if(fails === 3 || score > 50) {
      dispatch({type: "resetScore", team: parseInt(id)})
    }
    if(fails === 3 && state.options.elimination) {
      dispatch({type: "eliminateTeam", team: state.teams[parseInt(id)], teamId: parseInt(id)})
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
      if (checkWinner(score, state.teams)) {
        console.log('fuck');
        dispatch({type: "setWinner", team: checkWinner(score, state.teams).playingTeams[0]})
        navigate(`/winner/${checkWinner(score, state.teams).playingTeams[0]}`, { replace: true })
      }
      if(setLevel(score)) {
        dispatch({type: "setLevel", team: parseInt(id)-2})
      }
      if(fails === 3 || score > 50) {
        dispatch({type: "resetScore", team: parseInt(id)-2}) 
      }
      if(fails === 3 && state.options.elimination) {
        dispatch({type: "eliminateTeam", team: state.teams[parseInt(id)-2], teamId: parseInt(id)-2})
      }
      
  } 
}, [dispatch, id, navigate, state.teams])

  useEffect(() => {
    if (state.winner){
      dispatch({type: "setWinner", team: parseInt(id)-2})
      navigate(`/winner/${state.winner}`, { replace: true })
    }
  }, [dispatch, id, navigate, state.winner])

  return (
    <div id="Game" className="Game">
      <Header/>
        {state.teams.map((team, i) => {
          if ((i+1).toString() === id) {
            return (
              <main className={`team${i+1} Game__content`} key={i}>
                <h2>{team.name}</h2>
                <Skittles/>
                <PlayingDatas team={team}/>  
                <div className='navBtns'>
                  {/* Si l'index+1 est égal au nombre de teams (dernière team) on retourne à la 1ère team*/}
                  {i+1 === state.teams.length && <Button elt={"Game"} text='Equipe suivante' size={"medium"} action={e => handleNextFirstTeam(i)} />}
                  {/* Si index+1 strictement inférieur au nombre de teams (pas la dernière team) on passe à la team suivante*/}
                  {i+1 < state.teams.length && <Button elt={"Game"} text='Equipe suivante' size={"medium"} action={e => handleNextTeam(i)} />}
                </div>
            </main>
            )
          } 
          return null
        })}
        <Footer/>
    </div>
  )
}

export default Game