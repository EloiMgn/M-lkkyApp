import { createStore } from "redux";
import produce from "immer";
import { getLocalStorage } from './utils/localStorage'

const initialState = {
  options: {
    elimination: false
  },
  theme: 'light',
  playing: false,
  turn: 0,
  teams: [],
  winner: null,
  skittles: [
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
  if (action.type === "startNewGame") {
    return initialState;
  }
  if (action.type === "restart") {
    return produce(state, draft => {
      draft.options.elimination = false
      draft.teams[action.idx].score = 0
      draft.teams[action.idx].fails = 0
      draft.teams[action.idx].playerTurn = 0
      draft.teams[action.idx].level = false
      draft.teams[action.idx].stats = []
      draft.turn = 0
      draft.playing = false
      draft.winner = null
      })
    }

  if (action.type === "setState") {
    const localStorage = JSON.parse(getLocalStorage())
    return {
      ...state,
      theme: localStorage.state.theme,
      playing: true,
      turn: localStorage.state.turn,
      teams: localStorage.state.teams
    };
  }

  if (action.type === "createNewTeam") {
    return produce(state, draft => {
      draft.teams.push(
        action.team
        )
      })
  }

  if (action.type === "deleteTeam") {
    return produce(state, draft => {
      draft.teams.splice(action.idx, 1);
      })
  }
  if (action.type === "changeOption") {
    if(action.option === "élimination") {
      return produce(state, draft => {
        draft.options.elimination = action.optionValue;
        })
    }
  }

  if (action.type === "startGame") {
    return produce(state, draft => {
      draft.playing = true
      draft.teams.forEach(team =>{
        team.players.forEach(player => {
        team.stats.push ({"player": player, "score": 0, "fails": 0})
        })
      })
    })
  }

  if (action.type === "nextTeam") {
    return {
      ...state,
      turn: action.currentTeam+1
    };
  }
  if (action.type === "previousTeam") {
    return {
      ...state,
      turn: action.currentTeam-1
    };
  }

  if (action.type === "nextPlayer") {
    return produce(state, draft => {
      // si le playerTurn est égal au nombre de player (dernier joueur) le playerTurn revient à 0 (premier joueur)
      if (draft.teams[(action.team)-1].playerTurn === (draft.teams[(action.team)-1].players.length)-1) {
        draft.teams[(action.team)-1].playerTurn = 0;
        // si le playerturn est différent du total de joueur on ajoute un tour et on passe au joueur suivant
      } else if (draft.teams[(action.team)-1].playerTurn !== (draft.teams[(action.team)-1].players.length)-1) {
        draft.teams[(action.team)-1].playerTurn++
      }
    })
  }

  if (action.type === "firstPlayer") {
    return produce(state, draft => {
      draft.teams[(action.team)-1].playerTurn = 0;
      })
  }

  if (action.type === "previousPlayer") {
    return produce(state, draft => {
    // si le playerTurn est égal a 0 (premier joueur) le player turn revient au nombrede player (dernier joueur)
      if (draft.teams[(action.team)-1].playerTurn === 0) {
        draft.teams[(action.team)-1].playerTurn = (draft.teams[(action.team)-1].players.length)-1;
    // si le playerTurn est différent de 0 (pas le premier joueur) on enlève un a à playerTurn (joueur précédent)
      } else if (draft.teams[(action.team)-1].playerTurn !== 0) {
        draft.teams[(action.team)-1].playerTurn--
        }
      })
  }


  if (action.type === "firstTeam") {
    return {
      ...state,
      turn: 0
    };
  }
  if (action.type === "lastTeam") {
    return {
      ...state,
      turn: state.teams.length
    };
  }
  if (action.type === "fail") {
    return produce(state, draft => {
      draft.teams[(action.team)-1].fails+=1;
      draft.teams[(action.team)-1].stats.forEach(player => {
        if (action.player === player.player) {
          player.fails+=1
        }
      })
      })
  }
  if (action.type === "unFail") {
    return produce(state, draft => {
      draft.teams[(action.team)-1].fails=0;
      })
  }
  
  if(action.type === "select") {
    return  produce(state, draft => {
      draft.skittles[(action.id)-1].value = true;
      })
  }
  if(action.type === "unSelect") {
    return  produce(state, draft => {
      draft.skittles[(action.id)-1].value = false;
      })
  }
  if(action.type === "resetSkittles") {
    return  produce(state, draft => {
      draft.skittles.forEach(skittle => {
        skittle.value = false
        })
      })
  }

  if (action.type === "scored") {
    return produce(state, draft => {
      draft.teams[(action.team)-1].score += action.score;
      draft.teams[(action.team)-1].stats.forEach(player => {
        if (action.player === player.player) {
          player.score += action.score
        }
      })
      })
  }

  if (action.type === "setLevel") {
    return produce(state, draft => {
      draft.teams[action.team].level = true;
      })
  }

  if (action.type === "resetScore") {
    if(state.teams[action.team].level) {
      return produce(state, draft => {
        draft.teams[action.team].score = 25;
        draft.teams[action.team].fails=0;
        })
    } else if(!state.teams[action.team].level) {
      return produce(state, draft => {
        draft.teams[action.team].score = 0;
        draft.teams[action.team].fails=0;
        })
    } 
  }

  if (action.type === "eliminateTeam") {
    return produce(state, draft => {
      draft.teams[action.team].eliminated = true;
      draft.teams[action.team].fails=0;
    })
  }

  if (action.type === "setWinner") {
    if(state.winner === null) {
      return {
        ...state,
        winner: action.team
      };
    }
  }
  return state;
}

export const store = createStore(reducer);