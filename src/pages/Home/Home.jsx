import './Home.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import molkkyImg from '../../utils/img/molkky.jpg'
import HomeModale from '../../components/HomeModale/HomeModale';



const Home = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const navigate = useNavigate()

  const handleStartNewGame = () => {
    dispatch({type: "startNewGame"})
    setTimeout(navigate('/dashboard', {replace: true}), 5000)
    // check localStorage
    const rawLocalStorage = getLocalStorage('molkking_param')
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
        removeLocalStorage()
      }
    }

    const handleContinueGame = () => {
      navigate(`/game/${state.teams[state.turn].name}/${state.turn}/${state.teams[state.turn].players[state.teams[state.turn].playerTurn]}`, { replace: true })
      }

    useEffect(() => {
      const rawLocalStorage = getLocalStorage('molkking_param')
      if (state.teams.length <= 1 && rawLocalStorage) {
        dispatch({ type: "setState"})
      }
    }, [dispatch, state])

    const buttonStyleGreen = {
      backStyle: {
        "background": `linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%) `
      },
      "frontStyle": {
        "background": "#219653"
      }
    }

    if(state.teams.length > 1) {
      return (
        <div id="Home" className="Home">
          <HomeModale/>
          <Header/>
          <main className='Home__content'>
            <div className='Home__content__text'>
              <h1>Bienvenue sur <strong>MölkKing</strong></h1>
              <img className='Rules__img-img' src={molkkyImg} alt="" />
              <h2>Devenez le King 🤴 (ou la Queen 👸, pas de jaloux-ses) du Mölkky</h2>
            </div>
            <Button text='Continuer la partie en cours' action={handleContinueGame} frontStyle={buttonStyleGreen.frontStyle} backStyle={buttonStyleGreen.backStyle}/>
            <Button text='Démarrer une nouvelle partie' action={handleStartNewGame}  ico={"fas fa-play"} />
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
        <HomeModale/>
        <Header/>
        <main className='Home__content'>
          <div className='Home__content__text'>
            <h1>Bienvenue sur <strong>MölkKing</strong></h1>
            <img className='Rules__img-img' src={molkkyImg} alt="" />
            <h2>Soyez le King 🤴 (ou la Queen 👸, pas de jaloux-ses) du Mölkky!</h2>
          </div>
          <Button text='Nouvelle partie' size={"medium"} action={handleStartNewGame} ico={"fas fa-play"} frontStyle={buttonStyleGreen.frontStyle} backStyle={buttonStyleGreen.backStyle}/>
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