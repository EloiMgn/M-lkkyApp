import produce from 'immer';
import { createStore } from 'redux';
import { getLocalStorage } from './utils/localStorage';

const initialState = {
  randomTeams: false,
  previousAction: [],
  options: {
    elimination: false,
    egalisation: false,
    // maxPoints: 50,
  },
  theme: 'light',
  playing: false,
  turn: 0,
  teams: [],
  eliminatedTeams: [],
  winner: null,
  pins: [
    {value: false, id: 1},
    {value: false, id: 2},
    {value: false, id: 3},
    {value: false, id: 4},
    {value: false, id: 5},
    {value: false, id: 6},
    {value: false, id: 7},
    {value: false, id: 8},
    {value: false, id: 9},
    {value: false, id: 10},
    {value: false, id: 11},
    {value: false, id: 12}
  ]
};


function reducer(state = initialState, action) {

  // ===== Reset State width stored state in case of refreshment ===
  if (action.type === 'setState') {
    const localStorage = JSON.parse(getLocalStorage('molkking_param'));
    return produce(state, draft => {
      // draft.eliminatedTeams = localStorage.eliminatedTeams
      draft.theme = localStorage.state.theme;
      draft.playing = true;
      draft.turn = localStorage.state.turn;
      draft.teams = localStorage.state.teams;
      draft.options.elimination = localStorage.state.options.elimination;
      draft.options.egalisation = localStorage.state.options.egalisation;
    });
  }

  // ===== HANDLE GAMES STATES MANAGMENT ========

  // == init new game ==
  if (action.type === 'startNewGame') {
    return initialState;
  }

  // == resart Game with same players ==
  if (action.type === 'restart') {
    return produce(state, draft => {
      draft.options.elimination = false;
      draft.options.egalisation = false;
      draft.teams[action.idx].score = 0;
      draft.teams[action.idx].fails = 0;
      draft.teams[action.idx].playerTurn = 0;
      draft.teams[action.idx].level = false;
      draft.teams[action.idx].stats = [];
      draft.teams[action.idx].eliminated = false;
      draft.turn = 0;
      draft.playing = false;
      draft.winner = null;
      draft.eliminatedTeams = [];
    });
  }

  // == Start playing & init Stats ==

  if (action.type === 'startGame') {
    return produce(state, draft => {
      draft.playing = true;
      draft.teams.forEach(team =>{
        team.players.forEach(player => {
          team.stats.push ({'player': player, 'score': 0, 'fails': 0});
        });
      });
    });
  }

  // ===== HANDLE TEAM MANAGMENT ======

  // == Set random Teams state ==
  if (action.type === 'randomTeams') {
    return {
      ...state,
      randomTeams: action.value
    };
  }

  // == Add New team to teams Array ==
  if (action.type === 'createNewTeam') {
    return produce(state, draft => {
      draft.teams.push(
        action.team
      );
    });
  }

  // == Delete Selected team from Teams Array ==
  if (action.type === 'deleteTeam') {
    return produce(state, draft => {
      draft.teams.splice(action.idx, 1);
    });
  }

  // // == Delete all teams from Teams Array ==
  // if (action.type === 'resetTeams') {
  //   console.log('yeas');
  //   return produce(state, draft => {
  //     draft.teams = [];
  //   });
  // }

  // ===== HANDLE GAME NAVIGATION WHEN PLAYING =====

  // == Set turn  ==
  if (action.type === 'setTurn') {
    if(action.team !== state.teams.length-1){
      return {
        ...state,
        turn: action.team+1
      };
    } else return {
      ...state,
      turn: 0
    };

  }

  // == Set playerTurn to playerTurn +1 ==
  if (action.type === 'nextPlayer') {
    return produce(state, draft => {
      // si le playerTurn est égal au nombre de player (dernier joueur) le playerTurn revient à 0 (premier joueur)
      if (draft.teams[(action.team)].playerTurn === (draft.teams[(action.team)].players.length)-1) {
        draft.teams[(action.team)].playerTurn = 0;
        // si le playerturn est différent du total de joueur on ajoute un tour et on passe au joueur suivant
      } else if (draft.teams[(action.team)].playerTurn !== (draft.teams[(action.team)].players.length)-1) {
        draft.teams[(action.team)].playerTurn++;
      }
    });
  }

  // Cancel previous team Action

  if (action.type === 'cancelPrevious') {
    const previousState = JSON.parse(getLocalStorage('previousState'));
    // console.log(previousState);
    return {
      ...previousState,
      pins: [
        {value: false, id: 1},
        {value: false, id: 2},
        {value: false, id: 3},
        {value: false, id: 4},
        {value: false, id: 5},
        {value: false, id: 6},
        {value: false, id: 7},
        {value: false, id: 8},
        {value: false, id: 9},
        {value: false, id: 10},
        {value: false, id: 11},
        {value: false, id: 12}
      ]
    };
  }

  // ====== HANDLE SKITTLES MANAGMENT ======
  if(action.type === 'select') {
    return  produce(state, draft => {
      draft.pins[(action.id)-1].value = true;
    });
  }
  if(action.type === 'unSelect') {
    return  produce(state, draft => {
      draft.pins[(action.id)-1].value = false;
    });
  }
  if(action.type === 'resetSkittles') {
    return  produce(state, draft => {
      draft.pins.forEach(skittle => {
        skittle.value = false;
      });
    });
  }

  // ===== HANDLE SCORE CALCULATION =====

  // == If no skittles selected => set fail to fail +1 & set stats fail to +1==
  if (action.type === 'fail') {
    return produce(state, draft => {
      draft.teams[action.team].fails+=1;
      draft.teams[action.team].stats.forEach(player => {
        if (action.player === player.player) {
          player.fails+=1;
        }
      });
      draft.previousAction = `L'équipe ${draft.teams[action.team].name} n'a touché aucune quille`;
    });
  }

  // == Set fails to 0 if any skittle falled ==
  if (action.type === 'unFail') {
    return produce(state, draft => {
      draft.teams[action.team].fails=0;
    });
  }

  // == Add the score to team score && add the score to the player score stats==
  if (action.type === 'scored') {
    return produce(state, draft => {
      draft.teams[action.team].score += action.score;
      draft.teams[action.team].stats.forEach(player => {
        if (action.player === player.player) {
          player.score += action.score;
        }
      });
      draft.previousAction = `L'équipe ${draft.teams[action.team].name} a marqué ${action.score} points`;
    });
  }

  // == If score > 25 => setLevel to True
  if (action.type === 'setLevel') {
    return produce(state, draft => {
      draft.teams[action.team].level = true;
      // draft.previousAction.push(`L'équipe ${action.team} a dépassé le palier de 25 points`)
    });
  }

  // == If reset score => set score to 0 if level is false or to 25 if level is true ==
  if (action.type === 'resetScore') {
    if(state.teams[action.team].level) {
      return produce(state, draft => {
        draft.teams[action.team].score = 25;
        draft.teams[action.team].fails=0;
        draft.previousAction =`Le score de l'équipe ${draft.teams[action.team].name} a été ramené à 25`;
      });
    } else if(!state.teams[action.team].level) {
      return produce(state, draft => {
        draft.teams[action.team].score = 0;
        draft.teams[action.team].fails=0;
        draft.previousAction = `Le score de l'équipe ${draft.teams[action.team].name} a été ramené à 0`;
      });
    }
  }

  // == If reset score => set score to 0 if level is false or to 25 if level is true ==
  if (action.type === 'resetFails') {
    return produce(state, draft => {
      draft.teams[action.team].fails=0;
    });
  }

  // == If winner => set winner to the winner team ==
  if (action.type === 'setWinner') {
    if(state.winner === null) {
      return {
        ...state,
        winner: action.team
      };
    }
  }

  // === Handle team elimination if 3 fails ===
  if (action.type === 'eliminateTeam') {
    return produce(state, draft => {
      draft.eliminatedTeams.push(action.team);
      draft.teams[action.teamId].eliminated = true;
      draft.teams[action.teamId].fails=0;
      draft.previousAction = `L'équipe ${draft.teams[action.team].name} a été éliminée`;
    });
  }

  // ===== HANDLE OPTIONS MODIFICATIONS ======
  if (action.type === 'changeOption') {
    if(action.option === 'élimination') {
      return produce(state, draft => {
        draft.options.elimination = action.optionValue;
      });
    }
    if(action.option === 'égalisation') {
      return produce(state, draft => {
        draft.options.egalisation = action.optionValue;
      });
    }
    // if(action.option === "maxPoints") {
    //   return produce(state, draft => {
    //     draft.options.maxPoints = action.optionValue;
    //   })
    // }
  }

  // === OTHER SCRIPTS NOT USED ===


  // if (action.type === "previousTeam") {
  //   return {
  //     ...state,
  //     turn: action.currentTeam-1
  //   };
  // }


  // if (action.type === "previousPlayer") {
  //   return produce(state, draft => {
  //   // si le playerTurn est égal a 0 (premier joueur) le player turn revient au nombrede player (dernier joueur)
  //     if (draft.teams[(action.team)-1].playerTurn === 0) {
  //       draft.teams[(action.team)-1].playerTurn = (draft.teams[(action.team)-1].players.length)-1;
  //   // si le playerTurn est différent de 0 (pas le premier joueur) on enlève un a à playerTurn (joueur précédent)
  //     } else if (draft.teams[(action.team)-1].playerTurn !== 0) {
  //       draft.teams[(action.team)-1].playerTurn--
  //       }
  //     })
  // }

  return state;
}

export const store = createStore(reducer);