import { createContext, useReducer } from "react";

export const GlobalStateContext = createContext();

const initialState = {
  accessToken: null,
  userDetails: null,
  meterDetails: null,
  chartData: null,
  isLoading: false,
};

export const actions = {
  SET_TOKEN: "SET_TOKEN",
  LOGOUT: "LOGOUT",
  SET_USERDETAILS: "SET-USERDETAILS",
  SET_METER_DETAILS: "SET_METER_DETAILS",
  SET_CHART_DATA: "SET_CHART_DATA",
  SET_IS_LOADING: "SET_IS_LOADING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case actions.LOGOUT:
      return {
        ...state,
        initialState,
      };
    case actions.SET_USERDETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case actions.SET_METER_DETAILS:
      return {
        ...state,
        meterDetails: action.payload,
      };

    case actions.SET_CHART_DATA:
      return {
        ...state,
        chartData: action.payload,
      };
    case actions.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
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
