import React, { createContext, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const GetDebitData = createContext({});
function DebitGlobalProvider({ children }) {
  let debitState = {
    debits: [],
    error: "",
    success: ""
  };

  function DebitReducer(state = debitState, action) {
    switch (action.type) {
      case "GET_DEBITS":
        return { ...state, debits: action.payload.debits, error: "" };

      case "ADD_DEBIT":
        return {
          ...state,
          debits: [...state.debits, action.payload.debit],
          success: "debit transaction was successfully added",
          error: "",
        };

      case "DELETE_DEBIT":
        return {
          ...state,
          debits: state.debits.filter(
            (debit) => debit._id !== action.payload.id
          ),
          success: action.payload.data.success,
          error: "",
        };

      case "UPDATE_DEBIT":
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
  const [state, dispatch] = useReducer(DebitReducer, debitState);

  function getDebitFromApi() {
    axios
      .get("http://127.0.0.1:5000/api/debits", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        dispatch({ type: "GET_DEBITS", payload: result.data });
      })
      .catch((err) => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  }

  function addDebitToApi(data) {
    axios
      .post("http://127.0.0.1:5000/api/debits", data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "ADD_DEBIT", payload: res.data });
        toast.info('Debit transaction has been added')
      })
      .catch((err) => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  }
  function deleteDebitFromApi(id) {
    axios
      .delete(`http://127.0.0.1:5000/api/debits/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_DEBIT", payload: { data: res.data, id } });
        toast.info('Debit transaction has been deleted')
      })
      .catch((err) => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  }

  function updateDebitFromApi(id, data) {
    axios
      .put(`http://127.0.0.1:5000/api/debits/${id}`, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "UPDATE_DEBIT", payload: { data: res.data, id } });
        toast.info('Debit transaction has been updated')
      })
      .catch((err) => {
        dispatch({ type: "GET_ERRORS", payload: err.response.data });
        toast.error(err.response.data.error)
      });
  }
  return (
    <GetDebitData.Provider
      value={{
        state,
        getDebitFromApi,
        addDebitToApi,
        deleteDebitFromApi,
        updateDebitFromApi,
      }}
    >
      {children}
    </GetDebitData.Provider>
  );
}

export default DebitGlobalProvider;
