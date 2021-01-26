import React, { useState, useContext } from "react";
import { GetCreditData } from "../../context/CreditGlobalProvider";
import { GetDebitData } from "../../context/DebitGlobalProvider";
import {
  validateAddTransaction,
  selectTransaction,
  singularForm,
} from "../../utils/addTransaction";
import "./add.css";

function AddTransaction(props) {
  const creditContext = useContext(GetCreditData);
  const debitContext = useContext(GetDebitData);
  const [error, setError] = useState("");
  let transactionIdArray = props.location.pathname.split("/").slice(3);

  let item;
  if (transactionIdArray[0] === "credits") {
    item = creditContext.state.credits.find(
      (credit) => credit._id === transactionIdArray[1]
    );
  }

  if (transactionIdArray[0] === "debits") {
    item = debitContext.state.debits.find(
      (debit) => debit._id === transactionIdArray[1]
    );
  }

  const [data, setData] = useState({
    transaction: item !== undefined ? item.transaction : "",
    amount: item !== undefined ? item.amount : "",
    type: item !== undefined ? singularForm(transactionIdArray[0]) : "",
  });

  // handle input changes
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { transaction, amount, type } = data;
    const arrayType = ["credit", "debit"];

    // set default error values
    setError("");

    // Form validation
    if (
      validateAddTransaction(transaction, amount, type, setError, arrayType)
    ) {
      if (item) {
        if (data.type === "credit") {
          creditContext.updateCreditFromApi(item._id, data);
        }
        if (data.type === "debit") {
          debitContext.updateDebitFromApi(item._id, data);
        }
        return;
      }
      selectTransaction(
        transaction,
        amount,
        type,
        arrayType,
        creditContext,
        debitContext
      );
    }
  };

  return (
    <div className="add-transaction-container">
      <div className="container">
        <h1 className="display-4 text-center">Add New Transaction</h1>

        {/* Log frontend authentication error */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>{error}</strong>
          </div>
        )}

        <form className="my-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="transaction">Title:</label>
            <input
              type="text"
              onChange={handleChange}
              value={data.transaction}
              className="form-control"
              name="transaction"
              id="transaction"
              aria-describedby="helpId"
              placeholder="Title"
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount: </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.amount}
              className="form-control"
              name="amount"
              id="amount"
              aria-describedby="helpId"
              placeholder="Amount"
              required={true}
            />
          </div>
          {item ? (
            ""
          ) : (
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select
                className="form-control"
                name="type"
                id="type"
                value={data.type}
                onChange={handleChange}
              >
                <option hidden>Select Transaction</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
          )}
          <button type="submit" className="btn btn-block btn-primary my-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
