import './Home.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage'
import Button from '../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import molkkyImg from '../../utils/img/iStock-1324002091.jpg'
import Title from '../../components/Title/Title';
// import HomeModale from '../../components/HomeModale/HomeModale';



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
      frontStyle: {
        "background": "#219653",
      },
      frontHoverStyle: {
        "background": "#219653",
      },
      backStyle: {
        "background": `linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)`
      },
      backHoverStyle: {
        "background": `linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)`
      }
    }

    if(state.teams.length > 1) {
      return (
        <main className='Home'>
          <div className='Home__content'>
            <div className='Rules__img'>
              <img className='Rules__img-img' src={molkkyImg} alt="" />
            </div>
            <div className='Home__text'>
            <Title text={'Bienvenue sur MölkKing'}/>
              <h2>Devenez le King 🤴 ou la Queen 👸 du Mölkky</h2>
            </div>
            <div className='bottom__container'>
              <Button text='Continuer la partie en cours' action={handleContinueGame} style={buttonStyleGreen} ico={"fas fa-redo"} animation/>
              <Button text='Démarrer une nouvelle partie' action={handleStartNewGame}  ico={"fas fa-play"} />
              <div className='Home__links'>
                <h3>Liens utiles:</h3>
                <ul className='Home__links-list'>
                  <li><i className="fas fa-external-link"></i><Link to="/skittles">Connaitre le placement initial des quilles</Link></li>
                  <li><i className="fas fa-external-link"></i><Link to="/rules">Les règles officielles du Mölkky</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      )
    } return (
      <main className='Home'>
          <div className='Home__content'>
              <div className='Rules__img'>
                  <img className='Rules__img-img' src={molkkyImg} alt="" />
              </div>
            <div className='Home__text'>
            <Title text={'Bienvenue sur MölkKing'}/>
              <h2>Soyez le King 🤴 ou la Queen 👸 du Mölkky!</h2>
            </div>
            <div className='bottom__container'>
              <Button text='Nouvelle partie' size={"medium"} action={handleStartNewGame} ico={"fas fa-play"} style={buttonStyleGreen}/>
              <div className='Home__links'>
                <h3>Liens utiles:</h3>
                <ul className='Home__links-list'>
                  <li><i className="fas fa-external-link"></i><Link to="/skittles">Connaitre le placement initial des quilles</Link></li>
                  <li><i className="fas fa-external-link"></i><Link to="/rules">Les règles officielles du Mölkky</Link></li>
                </ul>
              </div>
            </div>
          </div>
      </main>
    )
}

export default Home