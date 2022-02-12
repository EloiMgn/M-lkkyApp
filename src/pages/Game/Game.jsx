import { useSelector } from 'react-redux';
import {useEffect, useState } from 'react';
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
import { checkWinner } from '../../utils/tools';

const Game = () => {
  const {id, playerId} = useParams();
  const state = useSelector((state) => state)
  const score = useSelector((state) => state.teams[parseInt(id)-1].score)
  const range = [1, 2, 3]
  const dispatch = useDispatch()

  useEffect(() => {
    if (state.teams.length > 1) {
      setLocalStorage({ date: new Date(), state })
    } else if (state.teams.length <= 1) {
      dispatch({ type: "setState"})
    }
  }, [dispatch, id, state])

  // useEffect(() => {
  //   // console.log(score);
  //   if (checkWinner(score)) {
  //     // console.log(score);
  //     dispatch({type: "setWinner", team: parseInt(id)})
  //   }
  // }, [state])

  const [select12, setSelect12] = useState(false)
  const [select11, setSelect11] = useState(false)
  const [select10, setSelect10] = useState(false)
  const [select9, setSelect9] = useState(false)
  const [select8, setSelect8] = useState(false)
  const [select7, setSelect7] = useState(false)
  const [select6, setSelect6] = useState(false)
  const [select5, setSelect5] = useState(false)
  const [select4, setSelect4] = useState(false)
  const [select3, setSelect3] = useState(false)
  const [select2, setSelect2] = useState(false)
  const [select1, setSelect1] = useState(false)

  const selectedSkittles = [
    {value: select1, id: 1},
    {value: select2, id: 2},
    {value: select3, id: 3},
    {value: select4, id: 4},
    {value: select5, id: 5},
    {value: select6, id: 6},
    {value: select7, id: 7},
    {value: select8, id: 8},
    {value: select9, id: 9},
    {value: select10, id: 10},
    {value: select11, id: 11},
    {value: select12, id: 12}
  ] 

// Handle selection of valid skittles :
  const handleclick1 = () => {
    setSelect1(!select1);
  }
  const handleclick2 = () => {
    setSelect2(!select2);
  }
  const handleclick3 = () => {
    setSelect3(!select3);
  }
  const handleclick4 = () => {
    setSelect4(!select4);
  }
  const handleclick5 = () => {
    setSelect5(!select5);
  }
  const handleclick6 = () => {
    setSelect6(!select6);
  }
  const handleclick7 = () => {
    setSelect7(!select7);
  }
  const handleclick8 = () => {
    setSelect8(!select8);
  }
  const handleclick9 = () => {
    setSelect9(!select9);
  }
  const handleclick10 = () => {
    setSelect10(!select10);
  }
  const handleclick11 = () => {
    setSelect11(!select11);
  }
  const handleclick12 = () => {
    setSelect12(!select12);
  }
  
  const handleResetSkittles = () => {
    setSelect1(false)
    setSelect2(false)
    setSelect3(false)
    setSelect4(false)
    setSelect5(false)
    setSelect6(false)
    setSelect7(false)
    setSelect8(false)
    setSelect9(false)
    setSelect10(false)
    setSelect11(false)
    setSelect12(false)
  }


  const handleNextTeam = (i)  => {
    dispatch({ type: "nextTeam", currentTeam: i })
    dispatch({type: "nextPlayer", team: parseInt(id)})
    calculateScore(selectedSkittles, id)

    handleResetSkittles()
  }

  const handleNextFirstTeam = (i)  => {
    dispatch({ type: "firstTeam", currentTeam: i })
    dispatch({type: "nextPlayer", team: parseInt(id)})
    calculateScore(selectedSkittles, id)
    handleResetSkittles()
  }

  const calculateScore = (data, id) => {
    const falledSkittle = []
    data.forEach(skittle => {
      if (skittle.value === true) {
        falledSkittle.push(skittle)
      }
    })
    if (falledSkittle.length === 0) {
      dispatch({type: "fail", team: id})
    }
    if (falledSkittle.length === 1) {
      dispatch({type: "scored", score: falledSkittle[0].id, team: id})
      dispatch({type: "unFail", team: id})
    }
    if (falledSkittle.length > 1) {
      dispatch({type: "scored", score: falledSkittle.length, team: id})
      dispatch({type: "unFail", team: id})
    }
  }

  return (
    <div id="Game" className="Game">
      <Header/>
      <main className='Game__content'>
        {state.teams.map((team, i) => {
          if ((i+1).toString() === id) {
            return (
            <div className={`team${i+1} Game__content__body`} key={i}>
              <h2>{team.name}</h2>
                <div className='select'>
                  <div className='select__top'>
                    <div className={select7? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick7()}>7</div>
                    <div className={select9? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick9()}>9</div>
                    <div className={select8? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick8()}>8</div>
                  </div>
                  <div className='select__middleTop'>
                    <div className={select5? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick5()}>5</div>
                    <div className={select11? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick11()}>11</div>
                    <div className={select12? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick12()}>12</div>
                    <div className={select6? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick6()}>6</div>
                  </div>
                  <div className='select__middleBottom'>
                    <div className={select3? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick3()}>3</div>
                    <div className={select10? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick10()}>10</div>
                    <div className={select4? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick4()}>4</div>
                  </div>
                  <div className='select__bottom'>
                    <div className={select1? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick1()}>1</div>
                    <div className={select2? 'select__skittle selected' : 'select__skittle'} onClick={e =>handleclick2()}>2</div>
                  </div>
                </div>
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