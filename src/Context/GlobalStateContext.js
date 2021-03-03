import { createContext, useReducer } from "react";

export const GlobalStateContext = createContext();

const initialState = {
  accessToken: null,
};

export const actions = {
  SET_TOKEN: "SET_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
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
            initialState
        };

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
