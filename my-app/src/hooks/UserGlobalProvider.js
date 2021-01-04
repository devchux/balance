import React, { useReducer, createContext } from "react";

export let UserFetchApi = createContext({});
function UserGlobalProvider({ children }) {
  let initialState = {
      user: null,
      error: null
  };
  function reducer(state, action) {
    switch (action.type) {
      case "GET_USER":
          if (action.payload.error) {
            return { ...state, error: action.payload, user: null }; 
          }
        return { ...state, user: action.payload, error: null };
      case "GET_ERROR":
        return { ...state, error: action.payload, user: null };

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // Register user func
  const registerUser = (data) => {
    fetch("http://127.0.0.1:5000/api/auth/signup", {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "GET_USER", payload: result });
      })
      .catch((err) => {
        dispatch({ type: "GET_ERROR", payload: err });
      });
  };

   // Login user func
   const loginUser = (data) => {
    fetch("http://127.0.0.1:5000/api/auth/signin", {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "GET_USER", payload: result });
      })
      .catch((err) => {
        dispatch({ type: "GET_ERROR", payload: err });
      });
  };
  return (
    <UserFetchApi.Provider value={{ registerUser, loginUser, state }}>
      {children}
    </UserFetchApi.Provider>
  );
}

export default UserGlobalProvider;
