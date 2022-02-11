import './Home.scss'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/localStorage'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
// import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { checkGamePlaying } from '../../store';



const Home = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const handleStartNewGame = () => {
    dispatch({type: "startNewGame"})
    // check localStorage
    const rawLocalStorage = getLocalStorage()
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
        removeLocalStorage()
      }
    }

    useEffect(() => {
      if (state.teams.length > 1) {
        setLocalStorage({ date: new Date(), state })
      } else if (state.teams.length <= 1) {
        // dispatch({ type: "setState"})
      }
    }, [dispatch, state])

    if(state.teams.length > 1) {
      return (
        <div id="Home" className="Home">
          <Header/>
          <main className='Home__content'>
            <Button elt={"Home"} text='Démarrer une nouvelle partie' size={"medium"} link={"/dashboard"} action={handleStartNewGame}/>
            <Button elt={"Home"} text='Continuer la partie en cours' size={"medium"} link={"/dashboard"}/>
          </main>
          <Footer/>
        </div>
      )
    } return (
      <div id="Home" className="Home">
        <Header/>
        <main className='Home__content'>
          <Button elt={"Home"} text='Nouvelle partie' size={"medium"} link={"/dashboard"} action={handleStartNewGame}/>
        </main>
        <Footer/>
      </div>
    )
}

export default Home