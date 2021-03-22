import { createContext, useReducer } from "react";

export const GlobalStateContext = createContext();

const initialState = {
  accessToken: null,
  userDetails: null,
};

export const actions = {
  SET_TOKEN: "SET_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
  SET_USERDETAILS: "SET-USERDETAILS",
};


const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case actions.REMOVE_TOKEN:
        return {
            ...state,
            initialState,
        };
    case actions.SET_USERDETAILS:
      return{
        ...state,
        userDetails: action.payload,
      }

    default:
      throw new Error();
  }
};

export const GlobalStateContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
