import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Game.scss'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import Skittles from '../../components/Skittles/Skittles';
import PlayingDatas from '../../components/PlayingDatas/PlayingDatas';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
// import { useEffect, useMemo, useState } from 'react';
import { setLocalStorage } from '../../utils/localStorage';
// import { checkIfEqual, checkWinner, setLevel } from '../../utils/tools';

const Game = () => {
  const { id, playerId } = useParams();
  const state = useSelector((state) => state)
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const [currentTeam, setCurrentTeam] = useState('')
  const [previousTeam, setPreviousTeam] = useState('')
  const [previousTeamId, setPreviousTeamId] = useState('')

  // const [eliminatedTeams, setEliminatedTeams] = useState([])
  // const [playingTeams, setPlayingTeams] = useState([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const eliminatedTeams = []
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const playingTeams = []
  // const [winner, setWinner] = useState('')

// == Handle recovering datas from localstorage if page refreshment ==
  useEffect(() => {
    if (state.teams.length > 1) {
      setLocalStorage({ date: new Date(), state })
    } else if (state.teams.length <= 1) {
      dispatch({ type: "setState"})
    }
  }, [dispatch, id, state])


// useEffect(() => {
//   // si équipe 1 affichée et plus de 2 équipes total
//   if(parseInt(id) === 1 && state.teams.length > 2) {
//     const score = state.teams[state.teams.length-1].score
//     const fails = state.teams[state.teams.length-1].fails

//     for (let i = 0; i < state.teams.length; i++) {
//       if(checkIfEqual(state.teams, score, state.teams.length-1) === state.teams[i]){
//         dispatch({type: "resetScore", team: i})
//       }
//     }
//     if (checkWinner(score, state.teams)) {
//       console.log('mince');
//       dispatch({type: "setWinner", team: checkWinner(score, state.teams).playingTeams[0]})
//       navigate(`/winner/${checkWinner(score, state.teams).playingTeams[0]}`, { replace: true })
//     }
//     if(setLevel(score)) {
//       dispatch({type: "setLevel", team: state.teams.length-1})
//     }
//     if(fails === 3 || score > 50) {
//       dispatch({type: "resetScore", team: state.teams.length-1})
//     }
//     if(fails === 3 && state.options.elimination) {
//       dispatch({type: "eliminateTeam", team: state.teams[state.teams.length-1], teamId: state.teams.length-1})
//     }
//   } 
//   // si équipe plus de 1 affichée et plus de 2 équipes total
//   else if (parseInt(id) > 1 && state.teams.length > 2){
//     const score = state.teams[parseInt(id)-2].score
//     const fails = state.teams[parseInt(id)-2].fails

//     //si le score précédent égalise le score d'une autre équipe
//     for (let i = 0; i < state.teams.length; i++) {
//       if(checkIfEqual(state.teams, score, parseInt(id)-2) === state.teams[i]){
//         dispatch({type: "resetScore", team: i})
//       }
//     }
//     // vérifie si la partie a un gagnant 
//     if (checkWinner(score, state.teams)) {
//       console.log('zut');
//       dispatch({type: "setWinner", team: checkWinner(score, state.teams).playingTeams[0]})
//       navigate(`/winner/${checkWinner(score, state.teams).playingTeams[0]}`, { replace: true })
//     }
//     // vérifie si le pallier de 25 points est atteint
//     if(setLevel(score)) {
//       dispatch({type: "setLevel", team: parseInt(id)-2})
//     }
//     //vérifie si les 3 lancés raté sont atteints ou si 50 points sont dépassés et restaure le score au palier précédent le cas échéant
//     if(fails === 3 || score > 50) {
//       dispatch({type: "resetScore", team: parseInt(id)-2})
//     }
//     if(fails === 3 && state.options.elimination) {
//       dispatch({type: "eliminateTeam", team: state.teams[parseInt(id)-2], teamId: parseInt(id)-2})
//     }
//   }

//    // si équipe 1 affichée et 2 équipes total
//    else if (parseInt(id) === 1 && state.teams.length === 2) {
//     const score = state.teams[parseInt(id)].score
//     const fails = state.teams[parseInt(id)].fails

//     for (let i = 0; i < state.teams.length; i++) {
//       if(checkIfEqual(state.teams, score, parseInt(id)) === state.teams[i]){
//         dispatch({type: "resetScore", team: i})
//       }
//     }
//     if (checkWinner(score, state.teams)) {  
//       for (let i = 0; i < checkWinner(score, state.teams).playingTeams.length; i++) {
//         if(checkWinner(score, state.teams).playingTeams[i].score === 50){
//           dispatch({type: "setWinner", team: i})
//           navigate(`/winner/${i}`, { replace: true })
//         } 
//       }
//     }
//     if(setLevel(score)) {
//       dispatch({type: "setLevel", team: parseInt(id)})
//     }
//     if(fails === 3 || score > 50) {
//       dispatch({type: "resetScore", team: parseInt(id)})
//     }
//     if(fails === 3 && state.options.elimination) {
//       dispatch({type: "eliminateTeam", team: state.teams[parseInt(id)], teamId: parseInt(id)})
//     }
//   }

//   // si équipe 2 affichée et 2 équipes total
//     else if (parseInt(id) === 2 && state.teams.length === 2) {
//       const score = state.teams[parseInt(id)-2].score
//       const fails = state.teams[parseInt(id)-2].fails

//       for (let i = 0; i < state.teams.length; i++) {
//         if(checkIfEqual(state.teams, score, parseInt(id)-2) === state.teams[i]){
//           dispatch({type: "resetScore", team: i})
//         }
//       }
//       if (checkWinner(score, state.teams)) {
//         console.log('fuck');
//         dispatch({type: "setWinner", team: checkWinner(score, state.teams).playingTeams[0]})
//         navigate(`/winner/${checkWinner(score, state.teams).playingTeams[0]}`, { replace: true })
//       }
//       if(setLevel(score)) {
//         dispatch({type: "setLevel", team: parseInt(id)-2})
//       }
//       if(fails === 3 || score > 50) {
//         dispatch({type: "resetScore", team: parseInt(id)-2}) 
//       }
//       if(fails === 3 && state.options.elimination) {
//         dispatch({type: "eliminateTeam", team: state.teams[parseInt(id)-2], teamId: parseInt(id)-2})
//       }
      
//   } 
// }, [dispatch, id, navigate, state.teams])
// useEffect(() => {
//   const eliminatedTeams = []
//   state.teams.forEach(team => {
//     if (team.eliminated){
//       eliminatedTeams.push(team)
//     }
//   })
//   if (state.teams.length-eliminatedTeams.length === 1) {
//     state.teams.forEach(team => {
//       if (!team.eliminated){
//         setWinner(team)
//       }
//     })
// }
// }, [state.teams, previousTeam])

useEffect(() => {
  if (state.teams.length>0){
    if(id === "0"){
      setPreviousTeam(state.teams[state.teams.length-1])
      setPreviousTeamId(state.teams.length-1)
    } else {
      setPreviousTeam(state.teams[id-1])
      setPreviousTeamId(id-1)
    }
    setCurrentTeam(state.teams[id])
  }
}, [id, state.teams])

// == If 1 team not eliminated, last team left is winner == 

  useEffect(() => {
    const setWinnerTeam = () => {
      if (state.teams.length === 1){
       state.teams.forEach((team, i) => {
          if (!team.eliminated){
          dispatch({type: "setWinner", team: team})
          navigate(`/winner/${i}`, { replace: true })
          }
        })
      }
    }
      setWinnerTeam()
    }, [dispatch, navigate, state.teams])


useEffect(() => {
  const handleStateManagment = () => {
  // == Si la Team précédente n'a marqué aucun point trois fois de suite ==
    if(previousTeam.fails === 3){
      if (state.options.elimination){
        // dispatch({type: "eliminateTeam", teamId: previousTeamId, team: previousTeam})
        // dispatch({type: "deleteTeam", idx: previousTeamId})
        dispatch({type: "resetScore", team: previousTeamId}) 
      } else dispatch({type: "resetScore", team: previousTeamId}) 
    }

  // == Si la Team précédente a dépassé le score maximum ==
    if (previousTeam.score > 50) {
      dispatch({type: "resetScore", team: previousTeamId})
    }

  // == Si la Team précédente a atteint le score maximum pile ==
    if (previousTeam.score === 50){
      dispatch({type: "setWinner", team: previousTeamId})
    }

  // == Si la Team précédente a atteint le score palier (moitié du score max) ==
    if (previousTeam.score >= 25){
      dispatch({type: "setLevel", team: previousTeamId})
    }
  
  //== Si la team précédente atteint un score identique à l'une des autres équipes, l'autre équipe retombe au score palier ==
    for (let y = 0; y < state.teams.length; y++) {
      if(previousTeam.score !== 0 && previousTeam !== state.teams[y]){
        if(previousTeam.score === state.teams[y].score) {
          dispatch({type: "resetScore", team: y})
        }
      }
      // break
    } 
  }
  if(previousTeam !== ""){
    handleStateManagment()
  }
}, [previousTeam])


const handleResetSkittles = () => {
  dispatch({type: "resetSkittles"})
}

const handleNextTeam = (i) => {

  // ==== si dernière team => Retour à la première Team et passage au joueur suivant ====
  if(i+1 === state.teams.length){
    navigate(`/game/${state.teams[0].name}/0/${state.teams[0].players[state.teams[0].playerTurn]}`, { replace: true })
    dispatch({ type: "firstTeam", currentTeam: i })
  } 
  // ==== si pas dernière team => passage à la prochaine team et passage au joueur suivant ====
  else if (i+1 < state.teams.length) {
    navigate(`/game/${state.teams[i+1].name}/${i + 1}/${state.teams[i+1].players[state.teams[i+1].playerTurn]}`, { replace: true })
    dispatch({ type: "nextTeam", currentTeam: i })
  }

  dispatch({type: "nextPlayer", team: parseInt(id)})
  calculateScore()
  handleResetSkittles()
}

  const calculateScore = () => {
    const falledPins = []
    state.pins.forEach(skittle => {
      if (skittle.value === true) {
        falledPins.push(skittle)
      }
    })
    if (falledPins.length === 0) {
      dispatch({type: "fail", team: id, player: playerId})
    }
    if (falledPins.length === 1) {
      dispatch({type: "scored", score: falledPins[0].id, team: id, player: playerId})
      dispatch({type: "unFail", team: id})
    }
    if (falledPins.length > 1) {
      dispatch({type: "scored", score: falledPins.length, team: id, player: playerId})
      dispatch({type: "unFail", team: id})
    }
  }
  return (
    <div id="Game" className="Game">
      <Header/>
        {state.teams.map((team, i) => {
          if (i.toString() === id) {
            return (
              <main className={`team${i+1} Game__content`} key={i}>
                <h2>{team.name}</h2>
                <Skittles />
                <div className='navBtns'>
                  <Button text='Equipe suivante'action={e => handleNextTeam(i)} colorFront={'#f0003c'} colorBack={'#A30036'}/>
                </div>
                <PlayingDatas team={team}/>  
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