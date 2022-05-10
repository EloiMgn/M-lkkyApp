import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import NumberPicker from 'react-widgets/NumberPicker';
import Button from '../../components/Button/Button';
import Modale from '../../components/Modale/Modale';
import PlayingDatas from '../../components/PlayingDatas/PlayingDatas';
import Skittles from '../../components/Skittles/Skittles';
import Subtitle from '../../components/Subtitle/Subtitle';
import Teams from '../../components/Teams/Teams';
import Title from '../../components/Title/Title';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import './Game.scss';


const Game = () => {
  const { id, playerId } = useParams();
  const state = useSelector((state) => state);

  const navigate= useNavigate();
  const dispatch = useDispatch();

  const [nextTeam, setNextTeam] = useState('');
  const [nextTeamId, setNextTeamId] = useState('');

  const [previousTeamId, setPreviousTeamId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [selectedPin, setSelectedPin] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [infos, setInfos] = useState(false);
  const explicationsInfos = 'Pour calculer vos points vous pouvez sélectionner la ou les quilles tombées directement sur le schéma. Sinon, si vous avez fait tomber plus d\'une quille, entrez le nombre total de quilles tombées dans la zone prévue à cet effet puis cliquez sur \'équipe suivante\' pour confirmer';

  // == Handle recovering datas from localstorage if page refreshment ==
  useEffect(() => {
    if (state.teams.length > 1) {
      setLocalStorage({ date: new Date(), state });
    } else if (state.teams.length <= 1) {
      dispatch({ type: 'setState'});
    }
  }, [dispatch, id, state]);

  // === Set the next Team to show ====
  useEffect(() => {
    // == Si pas dernière team affichée : ==
    if (parseInt(id) !== state.teams.length-1 && state.teams[parseInt(id)+1]){

      if(!state.teams[parseInt(id)+1].eliminated){

        setNextTeam(state.teams[parseInt(id)+1]);
        setNextTeamId(parseInt(id)+1);
      } else {
        for (let j = 0; j < state.teams.length; j++) {
          if(!state.teams[j].eliminated && j>parseInt(id)){
            setNextTeam(state.teams[j]);
            setNextTeamId(j);
            break;
          }
        }
      }
      //== Si dernière team affichée : ===
    } else if(parseInt(id) === state.teams.length-1 &&state.teams[0]) {

      if(!state.teams[0].eliminated){
        setNextTeam(state.teams[0]);
        setNextTeamId(0);
      } else {
        for (let j = 0; j < state.teams.length; j++) {
          if(!state.teams[j].eliminated){
            setNextTeam(state.teams[j]);
            setNextTeamId(j);
            break;
          }
        }
      }
    }
  }, [id, state.teams]);


  // == Vérifie si la Team précédente a raté 3 lancés d'affilé ==
  const checkFails = (previousTeam) => {
    if(previousTeam.fails === 3){
      if (state.options.elimination){
        dispatch({type: 'eliminateTeam', teamId: previousTeamId, team: previousTeam});
      } else {
        dispatch({type: 'resetScore', team: previousTeamId});
        dispatch({type: 'resetFails', team: previousTeamId});
      }
    }
  };

  // == Vérifie si la Team précédente a dépassé le score maximum ==
  const checkIfExceedsScore = (previousTeam) => {
    if (previousTeam.score > 50) {
      dispatch({type: 'resetScore', team: previousTeamId});
      dispatch({type: 'resetFails', team: previousTeamId});
    }
  };


  // == Si la Team précédente a atteint le score palier (moitié du score max) ==
  const checkIfLevel = (previousTeam) => {
    if (previousTeam.score >= 25){
      dispatch({type: 'setLevel', team: previousTeamId});
    }
  };

  //== Si la team précédente atteint un score identique à l'une des autres équipes, l'autre équipe retombe au score palier ==
  const checkIfScoreEqual = (previousTeam) => {
    for (let i = 0; i < state.teams.length; i++) {
      if(previousTeam.score === state.teams[i].score && previousTeam !== state.teams[i]){
        dispatch({type: 'resetScore', team: i});
      }
    }
  };

  //== Vérifie si une team est gagnante ==
  const checkIfwinner = (previousTeam) => {
    if(previousTeam.score === 50){
      dispatch({type: 'setWinner', team: previousTeamId});
      navigate(`/winner/${previousTeamId}`, { replace: true });
    }
  };

  //== Vérifie si toutes les team moins 1 ont été eliminées et set la dernière team gagnante ==
  const checkIfAllTeamsEliminated = () => {
    if(state.teams.length-state.eliminatedTeams.length === 1) {
      state.teams.forEach((team, i) => {
        if(!team.eliminated){
          dispatch({type: 'setWinner', team: i});
          navigate(`/winner/${i}`, { replace: true });
        }
      });
    }
  };

  useEffect(() => {

    const handleStateManagment = (previousTeam) => {
      checkFails(previousTeam);
      checkIfExceedsScore(previousTeam);
      checkIfLevel(previousTeam);
      checkIfwinner(previousTeam);
      checkIfAllTeamsEliminated();
      if(state.options.egalisation) {
        checkIfScoreEqual(previousTeam);
      }
    };
    if(previousTeamId !== null){
      handleStateManagment(state.teams[previousTeamId]);
    }
  },);


  const handleResetSkittles = () => {
    dispatch({type: 'resetSkittles'});
    setQuantity(0);
  };

  const openModal = ()=> {
    setInfos(true);
  };

  const handleSelectedPin = () => {
    const selectedPins =[];
    state.pins.forEach(pin => {
      if(pin.value){
        selectedPins.push(pin);
      }
    });
    if(selectedPins.length === 0){
      setSelectedPin(false);
    } else setSelectedPin(true);
  };

  useEffect(() =>{
    handleSelectedPin();
  });

  const handleCancelPrevious = () => {
    const previousState = JSON.parse(getLocalStorage('previousState'));
    navigate(`/game/${previousState.teams[previousTeamId].name}/${previousTeamId}/${previousState.teams[previousTeamId].players[previousState.teams[previousTeamId].playerTurn]}`, { replace: true });
    dispatch({type: 'cancelPrevious', team: parseInt(previousTeamId)});
    setPreviousTeamId(null);
  };

  const handleNextTeam = (i) => {
    localStorage.setItem('previousState', JSON.stringify(state));
    setAnimate(true);
    dispatch({type: 'nextPlayer', team: parseInt(id)});
    dispatch({type: 'setTurn', team: i});
    calculateScore();
    handleResetSkittles();
    setPreviousTeamId(i);
    // modifier aussi dans le css select transition
    setTimeout(()=> {
      navigate(`/game/${nextTeam.name}/${nextTeamId}/${nextTeam.players[nextTeam.playerTurn]}`, { replace: true });
      setAnimate(false);
    }, 1000);

  };

  const calculateScore = () => {
    let falledPins = [];
    state.pins.forEach(skittle => {
      if (skittle.value === true) {
        falledPins.push(skittle);
      }
    });
    if (falledPins.length === 0 && quantity === 0) {
      dispatch({type: 'fail', team: id, player: playerId});
    }
    if (falledPins.length === 1 && quantity === 0) {
      dispatch({type: 'scored', score: falledPins[0].id, team: id, player: playerId});
      dispatch({type: 'unFail', team: id});
    }
    if (falledPins.length > 1 && quantity === 0) {
      dispatch({type: 'scored', score: falledPins.length, team: id, player: playerId});
      dispatch({type: 'unFail', team: id});
    }
    if (falledPins.length === 0 && quantity > 0) {
      dispatch({type: 'scored', score: quantity, team: id, player: playerId});
      dispatch({type: 'unFail', team: id});
    }
    falledPins = [];
  };

  const buttonStyleGray = {
    frontStyle: {
      'background': '#6c6c6c',
      'transition': '200ms'
    },
    frontHoverStyle: {
      'background': '#6c6c6c',
      'transition': '200ms'
    },
    backStyle: {
      'background': '#4e4e4e',
      'transition': '200ms'
    },
    backHoverStyle: {
      'background': '#4c4c4c',
      'transition': '200ms'
    }
  };

  // ============================ DESKTOP ===========================================================================================
  if(window.innerWidth > 767) {
    return (
      state.teams.map((team, i) => {
        if (i.toString() === id) {
          return (
            <main className={`team${i+1} Game__content`} key={i}>
              {window.innerWidth>767 &&
                <section className='Game__content__dashboard'>
                  <Title text={'Scores'}/>
                  <Teams/>
                  <div className='separator'></div>
                  <PlayingDatas team={team}/>
                  <PlayingDatas team={state.teams[previousTeamId]} previousTeam/>
                </section>
              }
              <section className='Game__content__playingArea'>
                <Title text={'Partie en cours'}/>
                <Subtitle text={`Equipe : ${team.name}`}/>
                <div className={animate? 'skittles__container animated': 'skittles__container'}>
                  <Skittles color={state.teams[i].color} setQuantity={setQuantity} disabled={quantity!== 0 ? true : false} />
                  <Skittles color={nextTeam.color} />
                </div>
                <div className='select__text' style={{backgroundColor: `${state.teams[i].color}`}}>
                  <p>Sélectionnez sur le schéma les quilles tombées ou entrez le nombre de quilles tombées puis cliquez sur &quot;Equipe suivante&quot; pour valider</p>
                </div>
                <NumberPicker value={quantity} onChange={value => setQuantity(value)}  min={0} max={12} disabled={selectedPin? true : false}/>
                <div className='navBtns'>
                  <Button text='Equipe suivante'action={() => handleNextTeam(i)} ico={'fas fa-share'} animation/>
                  {previousTeamId !== null && <Button text='Annuler l&apos;action précédente' action={() => handleCancelPrevious(i)} ico={'fas fa-ban'} style={buttonStyleGray}/>}
                </div>

              </section>
            </main>
          );
        }
        return null;
      })
    );
  }

  // ============================ MOBILE ===========================================================================================
  else if (window.innerWidth < 765) {
    return (
      state.teams.map((team, i) => {
        if (i.toString() === id) {
          return (
            <main className={`team${i+1} Game__content`} key={i}>
              {infos && <Modale title={'Comment jouer ?'} text={explicationsInfos} setModal={setInfos}/>}
              <section className='Game__content__playingArea'>
                <PlayingDatas team={team}/>
                <NumberPicker value={quantity} onChange={value => setQuantity(value)}  min={0} max={12} disabled={selectedPin? true : false}/>
                <div className={animate? 'skittles__container animated': 'skittles__container'}>
                  <Skittles color={state.teams[i].color} setQuantity={setQuantity} disabled={quantity!== 0 ? true : false} />
                  <Skittles color={nextTeam.color} />
                </div>
                <div className='navBtns'>
                  <Button text='Equipe suivante' action={() => handleNextTeam(i)} ico={'fas fa-share'} animation/>
                  {previousTeamId !== null && <Button text='Annuler l&apos;action précédente' action={() => handleCancelPrevious(i)} ico={'fas fa-ban'} style={buttonStyleGray}/>}
                </div>
                <PlayingDatas previousTeam team={state.teams[previousTeamId]}/>
                <div className='subtitle__infos' onClick={openModal}>
                  <h2>Comment jouer ?</h2>
                  <i className="fas fa-question-circle" ></i>
                </div>
              </section>
            </main>
          );
        }
        return null;
      })
    );
  }
};

export default Game;