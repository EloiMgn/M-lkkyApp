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
import { setLocalStorage } from '../../utils/localStorage';

const Game = () => {
  const { id, playerId } = useParams();
  const state = useSelector((state) => state)
  const navigate= useNavigate()
  const dispatch = useDispatch()
  // const [currentTeam, setCurrentTeam] = useState('')
  // const [winner, setWinner] = useState(null)
  const [winnerId, setWinnerId] = useState(null)

  const [nextTeam, setNextTeam] = useState('')
  const [nextTeamId, setNextTeamId] = useState('')

  // const [previousTeam, setPreviousTeam] = useState('')
  const [previousTeamId, setPreviousTeamId] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eliminatedTeams = []

// == Handle recovering datas from localstorage if page refreshment ==
  useEffect(() => {
    if (state.teams.length > 1) {
      setLocalStorage({ date: new Date(), state })
    } else if (state.teams.length <= 1) {
      dispatch({ type: "setState"})
    }
  }, [dispatch, id, state])

  useEffect(() => {
    if(parseInt(id) === state.teams.length-1){
      if (!state.teams[0].eliminated) {
        setNextTeam(state.teams[0])
        setNextTeamId(0)
      } else{
        for (let y = 0; y < state.teams.length; y++) {
          if(!state.teams[y].eliminated) {
            setNextTeam(state.teams[y])
            setNextTeamId(y)
            break
          }
        }
      }
    } else {
      for (let j = 0; j < state.teams.length; j++) {
        if (!state.teams[j].eliminated && j > id){
          setNextTeam(state.teams[j])
          setNextTeamId(j)
          break
        } else if(state.teams[j].eliminated && j === state.teams.length-1 && !state.teams[0].eliminated){
          setNextTeam(state.teams[0])
          setNextTeamId(0)
        }
      }
    }
  }, [id, state.teams])


// useEffect(() => {
//   if (state.teams.length>0){
//     if(id === "0"){
//       setPreviousTeam(state.teams[state.teams.length-1])
//       setPreviousTeamId(state.teams.length-1)
//     } else {
//       setPreviousTeam(state.teams[id-1])
//       setPreviousTeamId(id-1)
//     }
//   }

// }, [id, state.teams])

// == If 1 team not eliminated, last team left is winner == 

useEffect(() => {

  const handleStateManagment = (previousTeam) => {
    if(previousTeam.fails === 3){
      if (state.options.elimination){
        dispatch({type: "eliminateTeam", teamId: previousTeamId, team: previousTeam})
      } else dispatch({type: "resetScore", team: previousTeamId}) 
    }

  // == Si la Team précédente a dépassé le score maximum ==
    if (previousTeam.score > 50) {
      dispatch({type: "resetScore", team: previousTeamId})
    }

  // == Si la Team précédente a atteint le score maximum pile ==
    if (previousTeam.score === 50){
      // setWinner(previousTeam)
      setWinnerId(previousTeamId)
    }

  // == Si la Team précédente a atteint le score palier (moitié du score max) ==
    if (previousTeam.score >= 25){
      dispatch({type: "setLevel", team: previousTeamId})
    }
  
  //== Si la team précédente atteint un score identique à l'une des autres équipes, l'autre équipe retombe au score palier ==
    if(state.options.egalisation){
      for (let y = 0; y < state.teams.length; y++) {
        if(previousTeam.score === state.teams[y].score && previousTeam.score !== 0) {
          for (let i = 0; i < 1; i++) {
            if(state.teams[y] !== previousTeam) {

              dispatch({type: "resetScore", team: y})
              // break
            }
          }
          break
        }
      } 

    }

    if(winnerId){
      dispatch({type: "setWinner", team: winnerId})
      navigate(`/winner/${winnerId}`, { replace: true })
    }
    if(previousTeam.score === 50){
      dispatch({type: "setWinner", team: previousTeamId})
      navigate(`/winner/${previousTeamId}`, { replace: true })
    }

  //== Ajoute les team eliminées dans eliminatedTeams ==
    state.teams.forEach(team => {
      if(team.eliminated){
        eliminatedTeams.push(team)
      }
    })
  //== Vérifie si toutes les team moins 1 ont été eliminées et set la dernière team gagnante ==
    if(state.teams.length-eliminatedTeams.length === 1) {
      state.teams.forEach((team, i) => {
        if(!team.eliminated){
          setWinnerId(i)
        }
      })
    }

  }
  if(previousTeamId !== null){
    handleStateManagment(state.teams[previousTeamId])
  }
}, [dispatch, eliminatedTeams, navigate, previousTeamId, state.options.egalisation, state.options.elimination, state.teams, winnerId])


const handleResetSkittles = () => {
  dispatch({type: "resetSkittles"})
}

const handleNextTeam = (i) => {

  navigate(`/game/${nextTeam.name}/${nextTeamId}/${nextTeam.players[nextTeam.playerTurn]}`, { replace: true })
  dispatch({type: "nextPlayer", team: parseInt(id)})
  dispatch({type: "setTurn", team: i})
  calculateScore()
  handleResetSkittles()
  setPreviousTeamId(i)
  // // ==== si dernière team => Retour à la première Team et passage au joueur suivant ====
  // if(i+1 === state.teams.length){
  //   dispatch({ type: "firstTeam", currentTeam: i })
  // } 
  // // ==== si pas dernière team => passage à la prochaine team et passage au joueur suivant ====
  // else if (i+1 < state.teams.length) {
  //   dispatch({ type: "nextTeam", currentTeam: i })
  // }
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
                  <Button text='Equipe suivante'action={e => handleNextTeam(i)} ico={'fas fa-share'}/>
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