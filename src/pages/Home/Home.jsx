import './Home.scss'
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
// import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { checkGamePlaying } from '../../store';



const Home = () => {
  const dispatch = useDispatch()

  const handleStartNewGame = () => {
    dispatch({type: "startNewGame"})
    // check localStorage
    const rawLocalStorage = getLocalStorage()
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
        removeLocalStorage()
      }
    }

    return (
      <div id="Home" className="Home">
        <Header/>
        <main className='Home__content'>
          <Button elt={"Home"} text='Démarrer une nouvelle partie' size={"medium"} link={"/Dashboard"} action={handleStartNewGame}/>
        </main>
        <Footer/>
      </div>
    )
}

export default Home