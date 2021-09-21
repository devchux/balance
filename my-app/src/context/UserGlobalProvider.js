import React, { useReducer, createContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export let GetUserData = createContext({});
function UserGlobalProvider({ children }) {
  let history = useHistory();
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
      .post("https://mybalance-api.herokuapp.com/api/auth/signup", data)
      .then((result) => {
        dispatch({ type: "GET_USER", payload: result.data });
        history.push("/dashboard/home");
      })
      .catch((err) => {
        dispatch({ type: "GET_ERROR", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  };

  // Login user func
  const loginUser = (data) => {
    axios
      .post("https://mybalance-api.herokuapp.com/api/auth/signin", data)
      .then((result) => {
        dispatch({ type: "GET_USER", payload: result.data });
        history.push("/dashboard/home");
      })
      .catch((err) => {
        dispatch({ type: "GET_ERROR", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  };

  //check user auth status
  const checkUser = () => {
    axios.get("https://mybalance-api.herokuapp.com/api/auth/user", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((result) => {
      result.data.token = localStorage.getItem("token")
      dispatch({ type: "GET_USER", payload: result.data });
      toast.info(result.data.success)
    })
    .catch((err) => {
      dispatch({ type: "GET_ERROR", payload: err.response.data });
      toast.error(err.response.data.error)
    });
  }

  return (
    <GetUserData.Provider value={{ registerUser, loginUser, state, checkUser }}>
      {children}
    </GetUserData.Provider>
  );
}

export default UserGlobalProvider;
