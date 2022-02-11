import { createStore } from "redux";
import produce from "immer";
// import { useEffect, useState } from "react";
import { getLocalStorage } from './utils/localStorage'
// import { isToday, localStorageDateToNewDate } from './utils/tools'


// // const createLocalStorage = (state) => {
// //   setLocalStorage({ date: new Date(), state })
// // }

// // // Vérifie qu'une partie est créee et qu'elle est en cours
// // const checkGamePlaying = (state) => {
// //   // check localStorage
// //   const rawLocalStorage = getLocalStorage()
// //   if (rawLocalStorage !== null) {
// //     const localStorage = JSON.parse(rawLocalStorage)
// //     // Vérifie si l'utilisateur est déjà venu aujourd'hui
// //       if (isToday(localStorageDateToNewDate(localStorage.date))) {
// //         // si des teams ont déjà été créées le state est mis à jour 
// //         if(localStorage.state.teams.length > 1) {
// //           createLocalStorage(localStorage.state)
// //         }
// //       }
// //   }
// // }


//   // // Vérifie qu'une partie est créee et qu'elle est en cours
//   // export const checkGamePlaying = () => {
//   //   // check localStorage
//   //   const rawLocalStorage = getLocalStorage()
//   //   if (rawLocalStorage !== null) {
//   //     const localStorage = JSON.parse(rawLocalStorage)
//   //     // Vérifie si l'utilisateur est déjà venu aujourd'hui
//   //       if (isToday(localStorageDateToNewDate(localStorage.date))) {
//   //         if(localStorage.state.teams.length > 1 && localStorage.state.playing) {
//   //           return true
//   //         }return false
//   //       } return false
//   //   } return false
//   // }


const initialState = {
  theme: 'light',
  playing: false,
  turn: 1,
  teams: []
};

// actions creators


function reducer(state = initialState, action) {
  if (action.type === "startNewGame") {
    return initialState;
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

  if (action.type === "startGame") {
    return {
      ...state,
      playing: true,
    };
  }

  if (action.type === "nextTeam") {
    return {
      ...state,
      turn: action.currentTeam+2
    };
  }

  if (action.type === "nextPlayer") {
    return produce(state, draft => {
      if (draft.teams[(action.team)-1].playerTurn === (draft.teams[(action.team)-1].players.length)-1) {
        draft.teams[(action.team)-1].playerTurn = 0;
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

  if (action.type === "firstTeam") {
    return {
      ...state,
      turn: 1
    };
  }
  if (action.type === "fail") {
    return produce(state, draft => {
      draft.teams[(action.team)-1].fails++;
      })
  }

  if (action.type === "scored") {
    return produce(state, draft => {
      draft.teams[(action.team)-1].score += action.score;
      })
  }
  return state;
}

export const store = createStore(reducer);