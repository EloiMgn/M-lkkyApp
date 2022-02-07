import { createStore } from "redux";
import produce from "immer";


// state
// const initialState = {
//   player1: 0,
//   player2: 0,
//   advantage: null,
//   winner: null,
//   playing: true,
// };

const initialState = {
  theme: 'light',
  playing: false,
  teams: []
};

// actions creators


function reducer(state = initialState, action) {
  if (action.type === "startNewGame") {
    return initialState;
  }

  if (action.type === "createNewTeam") {
    return produce(state, draft => {
      draft.teams.push(
        action.team
      )
    })
  }
  return state;
}

export const store = createStore(reducer);