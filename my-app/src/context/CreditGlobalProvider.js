import React, { createContext, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const GetCreditData = createContext({});
function CreditGlobalProvider({ children }) {
  let creditState = {
    credits: [],
    error: "",
    success: "",
  };

  function CreditReducer(state = creditState, action) {
    switch (action.type) {
      case "GET_CREDITS":
        return { ...state, credits: action.payload.credits, error: "" };

      case "ADD_CREDIT":
        return {
          ...state,
          credits: [...state.credits, action.payload.credit],
          success: "Credit transaction was successfully added",
          error: "",
        };

      case "DELETE_CREDIT":
        return {
          ...state,
          credits: state.credits.filter(
            (credit) => credit._id !== action.payload.id
          ),
          success: action.payload.data.success,
          error: "",
        };

      case "UPDATE_CREDIT":
        return {
          ...state,
          success: action.payload.data.success,
          error: "",
        };

      case "GET_ERRORS":
        return { ...state, error: action.payload.error, success: "" };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(CreditReducer, creditState);

  function getCreditFromApi() {
    axios
      .get("https://mybalance-api.herokuapp.com/api/credits", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        dispatch({ type: "GET_CREDITS", payload: result.data });
      })
      .catch((err) => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  }

  function addCreditToApi(data) {
    axios
      .post("https://mybalance-api.herokuapp.com/api/credits", data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "ADD_CREDIT", payload: res.data });
        toast.info('Credit transaction has been added')
      })
      .catch((err) => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  }
  function deleteCreditFromApi(id) {
    axios
      .delete(`https://mybalance-api.herokuapp.com/api/credits/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_CREDIT", payload: { data: res.data, id } });
        toast.info('Credit transaction has been deleted')
      })
      .catch((err) => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  }
  function updateCreditFromApi(id, data) {
    axios
      .put(`https://mybalance-api.herokuapp.com/api/credits/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "UPDATE_CREDIT", payload: { data: res.data, id } });
        toast.info('Credit transaction has been updated')
      })
      .catch((err) => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  }
  return (
    <GetCreditData.Provider
      value={{
        state,
        getCreditFromApi,
        addCreditToApi,
        updateCreditFromApi,
        deleteCreditFromApi,
      }}
    >
      {children}
    </GetCreditData.Provider>
  );
}

export default CreditGlobalProvider;
