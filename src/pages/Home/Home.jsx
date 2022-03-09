import './Home.scss'
import { Link } from 'react-router-dom'
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import molkkyImg from '../../utils/img/molkky.jpg'



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
      const rawLocalStorage = getLocalStorage()
      if (state.teams.length <= 1 && rawLocalStorage) {
        dispatch({ type: "setState"})
      }
    }, [dispatch, state])

    if(state.teams.length > 1) {
      return (
        <div id="Home" className="Home">
          <Header/>
          <main className='Home__content'>
            <div className='Home__content__text'>
              <h1>Bienvenue sur <strong>MölkKing</strong></h1>
              <img className='Rules__img-img' src={molkkyImg} alt="" />
              <h2>Devenez le King 🤴 (ou la Queen 👸, pas de jaloux-ses) du Mölkky</h2>
            </div>
            <Button elt={"Home"} text='Continuer la partie en cours' size={"medium"} link={"/dashboard"}/>
            <Button elt={"Home"} text='Démarrer une nouvelle partie' size={"medium"} link={"/dashboard"} action={handleStartNewGame}/>
            <div className='Home__content__links'>
              <h3>Liens utiles:</h3>
              <ul className='Home__content__links-list'>
                <li><i className="fas fa-external-link"></i><Link to="/skittles">Connaitre le placement initial des quilles</Link></li>
                <li><i className="fas fa-external-link"></i><Link to="/rules">Les règles officielles du Mölkky</Link></li>
              </ul>
            </div>
          </main>
          <Footer/>
        </div>
      )
    } return (
      <div id="Home" className="Home">
        <Header/>
        <main className='Home__content'>
          <div className='Home__content__text'>
            <h1>Bienvenue sur <strong>MölkKing</strong></h1>
            <img className='Rules__img-img' src={molkkyImg} alt="" />
            <h2>Soyez le King 🤴 (ou la Queen 👸, pas de jaloux-ses) du Mölkky!</h2>
          </div>
          <Button elt={"Home"} text='Nouvelle partie' size={"medium"} link={"/dashboard"} action={handleStartNewGame}/>
          <div className='Home__content__links'>
            <h3>Liens utiles:</h3>
            <ul className='Home__content__links-list'>
              <li><i className="fas fa-external-link"></i><Link to="/skittles">Connaitre le placement initial des quilles</Link></li>
              <li><i className="fas fa-external-link"></i><Link to="/rules">Les règles officielles du Mölkky</Link></li>
            </ul>
          </div>
        </main>
        <Footer/>
      </div>
    )
}

export default Home