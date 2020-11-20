import React, { createContext, useContext, useReducer } from "react";

// creating a dataLayer
export const StateContext = createContext(); // this is data layer
// creating a provider
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);