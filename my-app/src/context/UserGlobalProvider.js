import React, { useReducer, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export let GetUserData = createContext({});
function UserGlobalProvider({ children }) {
  let initialState = {
    success: "",
    error: "",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "GET_USER":
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          success: action.payload.success,
        };
      case "GET_ERROR":
        return { ...state, error: action.payload.error };

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // Register user func
  const registerUser = (data) => {
    axios
      .post("http://127.0.0.1:5000/api/auth/signup", data)
      .then((result) => {
        dispatch({ type: "GET_USER", payload: result.data });
        window.location = "/dashboard"
      })
      .catch((err) => {
        dispatch({ type: "GET_ERROR", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  };

  // Login user func
  const loginUser = (data) => {
    axios
      .post("http://127.0.0.1:5000/api/auth/signin", data)
      .then((result) => {
        dispatch({ type: "GET_USER", payload: result.data });
        window.location = "/dashboard/credits"
      })
      .catch((err) => {
        dispatch({ type: "GET_ERROR", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  };
  return (
    <GetUserData.Provider value={{ registerUser, loginUser, state }}>
      {children}
    </GetUserData.Provider>
  );
}

export default UserGlobalProvider;
