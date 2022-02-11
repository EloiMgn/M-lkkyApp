import { useSelector } from 'react-redux';
import {useState } from 'react';
import { useParams } from 'react-router-dom';
import './Game.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
// import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
// import { isToday, localStorageDateToNewDate } from '../../utils/tools'
import { useDispatch } from 'react-redux';

const Game = () => {
  const {id} = useParams();
  let state = useSelector((state) => state)
  const range = [1, 2, 3]
  const dispatch = useDispatch()

  // setLocalStorage({ date: new Date(), state })
  //   // check localStorage
  //   const rawLocalStorage = getLocalStorage()
  //   // si il y a quelqueChose dans le localStorage
  //   if (rawLocalStorage !== null) {
  //     const gotLocalStorage = JSON.parse(rawLocalStorage)
  
  //     if(gotLocalStorage.date){
  //       // si l'user est déja venu aujourd'hui
  //       if (isToday(localStorageDateToNewDate(gotLocalStorage.date))) {
  //         state = gotLocalStorage.state
  //       }
  //     }
  //     else {
  //     // on update le localStorage
  //     setLocalStorage({ date: new Date(), state })
  //     }
  //   }

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
    // select2,
    // select3,
    // select4,
    // select5,
    // select6,
    // select7,
    // select8,
    // select9,
    // select10,
    // select11,
    // select12
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
    selectedSkittles.forEach(skittle => {
      console.log();
    })
  }
  const handleNextTeam = (i)  => {
    dispatch({ type: "nextTeam", currentTeam: i })
    handleResetSkittles()
  }
  // let newState = useSelector((state) => state)


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
                      <div className='team__datas-fails'>
                        {range.map((rangeElem) =>
                          team.fails >= rangeElem ? <span key={rangeElem.toString()}>❌</span> : null
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='playingDatas__data__player'>
                    <p>Joueur:</p>
                    <div className='team__datas-playerName'>
                        {team.players.map((player) =>
                           <span key={player.toString()}>{player}</span>
                        )}
                      </div>
                  </div>
                </div>
              <Button elt={"Game"} text='Equipe suivante' size={"medium"} link={`/game/${i+2}`} action={e => handleNextTeam(i)}/>
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