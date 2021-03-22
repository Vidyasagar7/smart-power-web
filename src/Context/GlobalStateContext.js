import { createContext, useReducer } from "react";

export const GlobalStateContext = createContext();

const initialState = {
  accessToken: null,
  userDetails: null,
  meterDetails: null,
  chartData: null,
  isChartLoading: false,
};

export const actions = {
  SET_TOKEN: "SET_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
  SET_USERDETAILS: "SET-USERDETAILS",
  SET_METER_DETAILS: "SET_METER_DETAILS",
  SET_CHART_DATA: "SET_CHART_DATA",
  SET_IS_CHART_LOADING: "SET_IS_CHART_LOADING",
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
    case actions.SET_IS_CHART_LOADING:
      return {
        ...state,
        isChartLoading: action.payload,
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
