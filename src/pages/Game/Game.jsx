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
import { useCallback, useEffect, useState } from 'react';
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
  // const eliminatedTeams = []

// == Handle recovering datas from localstorage if page refreshment ==
  useEffect(() => {
    if (state.teams.length > 1) {
      setLocalStorage({ date: new Date(), state })
    } else if (state.teams.length <= 1) {
      dispatch({ type: "setState"})
    }
  }, [dispatch, id, state])

// === Set the next Team to show ====
  useEffect(() => {
    if (parseInt(id) !== state.teams.length-1){
      if(!state.teams[parseInt(id)+1].eliminated){
        setNextTeam(state.teams[parseInt(id)+1])
        setNextTeamId(parseInt(id)+1)
      } else {
        for (let j = 0; j < state.teams.length; j++) {
          if(!state.teams[j].eliminated){
            setNextTeam(state.teams[j])
            setNextTeamId(j)
            break
          }
        }
      }
    } else {
      if(!state.teams[0].eliminated){
        setNextTeam(state.teams[0])
        setNextTeamId(0)
      } else {
        for (let j = 0; j < state.teams.length; j++) {
          if(!state.teams[j].eliminated){
            setNextTeam(state.teams[j])
            setNextTeamId(j)
            break
          }
        }
      }

    }
  }, [id, state.teams])



// == Vérifie si la Team précédente a raté 3 lancés d'affilé ==
  const checkFails = (previousTeam) => {
    if(previousTeam.fails === 3){
      if (state.options.elimination){
        dispatch({type: "eliminateTeam", teamId: previousTeamId, team: previousTeam})
      } else dispatch({type: "resetScore", team: previousTeamId}) 
    }
  }

// == Vérifie si la Team précédente a dépassé le score maximum ==
  const checkIfExceedsScore = (previousTeam) => {
    if (previousTeam.score > 50) {
      dispatch({type: "resetScore", team: previousTeamId})
    }
  }

// == Si la Team précédente a atteint le score maximum pile ==
  const checkIfReachScore = (previousTeam) => {
    if (previousTeam.score === 50){
      setWinnerId(previousTeamId)
    }
  }

// == Si la Team précédente a atteint le score palier (moitié du score max) ==
  const checkIfLevel = (previousTeam) => {
    if (previousTeam.score >= 25){
      dispatch({type: "setLevel", team: previousTeamId})
    }
  }

//== Si la team précédente atteint un score identique à l'une des autres équipes, l'autre équipe retombe au score palier ==
  const checkIfScoreEqual = (previousTeam) => {
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
  }

//== Vérifie si une team est gagnante ==
  const checkIfwinner = (previousTeam) => {
    if(winnerId){
      dispatch({type: "setWinner", team: winnerId})
      navigate(`/winner/${winnerId}`, { replace: true })
    }
    if(previousTeam.score === 50){
      dispatch({type: "setWinner", team: previousTeamId})
      navigate(`/winner/${previousTeamId}`, { replace: true })
    }
  }

  //== Vérifie si toutes les team moins 1 ont été eliminées et set la dernière team gagnante ==
  const checkIfAllTeamsEliminated = () => {
      if(state.teams.length-state.eliminatedTeams.length === 1) {
        state.teams.forEach((team, i) => {
          if(!team.eliminated){
            setWinnerId(i)
          }
        })
      }
  }


useEffect(() => {

  const handleStateManagment = (previousTeam) => {
    checkFails(previousTeam)
    checkIfExceedsScore(previousTeam)
    checkIfReachScore(previousTeam)
    checkIfLevel(previousTeam)
    checkIfScoreEqual(previousTeam)
    checkIfwinner(previousTeam)
    checkIfAllTeamsEliminated()
  }
  if(previousTeamId !== null){
    handleStateManagment(state.teams[previousTeamId])
  }
},)


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