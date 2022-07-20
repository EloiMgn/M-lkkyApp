import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Subtitle from '../../components/Subtitle/Subtitle';
import Title from '../../components/Title/Title';
import molkkyImg from '../../utils/img/iStock-1324002091.jpg';
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { isToday } from '../../utils/tools';
import './Home.scss';
// import HomeModale from '../../components/HomeModale/HomeModale';


const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = ()=> {
    setIsOpen(false);
  };

  const isIphone = () => {
    if(navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)) {
      return true;
    } else return false;
  };

  useEffect(() => {
    isIphone();
    isIphone() && setIsOpen(true);
  }, []);

  // const modalText = 'Vous pouvez m\'ajouter à l\'écran d\'accueil en suivant ces instructions très simples: ';
  const handleResetTeams = () => {
    dispatch({type: 'startNewGameTeam'});
    const rawLocalStorage = getLocalStorage('molkking_param');
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
      removeLocalStorage();
    }
    navigate('/', {replace: true});    // check localStorage
  };

  const handleStartNewGameSolo = () => {
    dispatch({type: 'startNewGameSolo'});
    setTimeout(()=> {navigate('/new-player', {replace: true});}, 250);
    // check localStorage
    const rawLocalStorage = getLocalStorage('molkking_param');
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
      removeLocalStorage();
    }
  };

  const handleStartNewGameTeam = () => {
    dispatch({type: 'startNewGameTeam'});
    setTimeout(()=> {navigate('/dashboard', {replace: true});}, 250);
    // check localStorage
    const rawLocalStorage = getLocalStorage('molkking_param');
    // si il y a quelqueChose dans le localStorage
    if (rawLocalStorage !== null) {
      removeLocalStorage();
    }
  };


  const handleContinueGame = () => {
    navigate(`/game/${state.teams[state.turn].name}/${state.turn}/${state.teams[state.turn].players[state.teams[state.turn].playerTurn]}`, { replace: true });
  };

  useEffect(() => {
    const rawLocalStorage = getLocalStorage('molkking_param');
    if(rawLocalStorage !== null ) {
      const locaStorageDate = JSON.parse(rawLocalStorage).date;
      if(!isToday(locaStorageDate)) {
        removeLocalStorage();
      }
    }
    if (state.teams.length <= 1 && rawLocalStorage) {
      dispatch({ type: 'setState'});
    }

  }, [dispatch, state]);

  const buttonStyleGreen = {
    frontStyle: {
      'background': '#219653',
    },
    frontHoverStyle: {
      'background': '#219653',
    },
    backStyle: {
      'background': 'linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)'
    },
    backHoverStyle: {
      'background': 'linear-gradient(to left, #00672a 0%, #003314 8%, #003314 92%, #00672a 100%)'
    }
  };


  return (
    <main className='Home'>
      <div className='Home__content'>
        <div className='Home__img'>
          <img className='Home__img-img' src={molkkyImg} alt="" />
        </div>
        <div className='Home__text'>
          <Title text={'Bienvenue sur MölkKing'}/>
          <Subtitle text="Devenez le King 🤴 ou la Queen 👸 du Mölkky"/>
        </div>
        <div className='bottom__container'>
          {state.teams.length > 1 && <Button text='Continuer la partie en cours' action={handleContinueGame} style={buttonStyleGreen} ico={'fas fa-redo'} animation/>}
          {state.teams.length > 1?
            <Button text='Supprimer les équipes' action={handleResetTeams}  ico={'fas fa-play'} />
            :
            <>
              <Button text='Nouvelle partie' action={handleStartNewGameSolo} ico={'fas fa-user'} style={buttonStyleGreen}/>
              <Button text='Nouvelle partie en équipe' action={handleStartNewGameTeam} ico={'fas fa-users'} style={buttonStyleGreen}/>
            </>}
          {isIphone() && isOpen &&
            <div className='iphoneModale'>
              <div className='iphoneModale__content'>
                <div className='iphoneModale__content-top'>
                  <div className="iphoneModale__close">
                    <i className="fas fa-times modale__close__icon" onClick={closeModal}></i>
                  </div>
                  <h3>Ajoutez moi à votre écran d&apos;accueil pour un accès plus rapide!</h3>
                </div>
                <p>Cliquez sur <img src="https://img.icons8.com/ios-glyphs/30/000000/share-rounded.png"/>, puis &quot;Ajouter à l&apos;écran d&apos;accueil&quot;</p>
              </div>
              <div className='iphoneModale__arrow'></div>
            </div>
          }
          <div className='Home__links'>
            <h3>Liens utiles:</h3>
            <ul className='Home__links-list'>
              <li><i className="fab fa-facebook"></i><a href="https://www.facebook.com/molkkingApp/" target="_blank" rel="noreferrer">Suivez-moi sur facebook pour connaitre les dernières infos de l&apos;app !</a></li>
              <li><i className="fab fa-twitter"></i><a href="https://twitter.com/MolkKingApp" target="_blank" rel="noreferrer">Suivez-moi sur twitter pour connaitre les dernières infos de l&apos;app !</a></li>
              <li><i className="fas fa-external-link"></i><Link to="/skittles">Connaitre le placement initial des quilles</Link></li>
              <li><i className="fas fa-external-link"></i><Link to="/rules">Les règles officielles du Mölkky</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;