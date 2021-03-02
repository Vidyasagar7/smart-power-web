import { createContext, useReducer } from "react";

export const GlobalStateContext = createContext();

const initialState = {
  isLoggedIn: false,
  token: null,
  loginStatus: "",
};

export const actions = {
  LOGIN_SUCCESS: "login_success",
  LOGOUT: "logout",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loginStatus: "sucessful login",
        token: action.payload,
      };
    case actions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loginStatus: "sucessful logout",
        token: null,
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
