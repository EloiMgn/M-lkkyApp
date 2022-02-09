import { createStore } from "redux";
import produce from "immer";
// import { useEffect, useState } from "react";
// import { getLocalStorage, setLocalStorage } from '../localStorage'
// import { isToday, localStorageDateToNewDate } from '../tools'


const initialState = {
  theme: 'light',
  playing: false,
  turn: 0,
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
  if (action.type === "startGame") {
    return {
      ...state,
      playing: true,
    };
  }
  if (action.type === "nextTeam") {
    
    return {
      ...state,
      turn: action.currentTeam+1
    };
  }
  return state;
}

export const store = createStore(reducer);