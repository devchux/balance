import React, { useState, useContext, useEffect } from "react";
import { GetCreditData } from "../../context/CreditGlobalProvider";
import { GetDebitData } from "../../context/DebitGlobalProvider";
import { GetUserData } from "../../context/UserGlobalProvider";
import TransactionItem from "../transaction/TransactionItem";
import "./home.css";

function Home() {
  const {
    state: { credits },
    getCreditFromApi,
  } = useContext(GetCreditData);
  const {
    state: { debits },
    getDebitFromApi,
  } = useContext(GetDebitData);

  useEffect(() => {
    getCreditFromApi();
    getDebitFromApi();
  }, []);

  let transactions = credits.concat(debits);

  function sortTransactions() {
    let sorted = transactions.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return sorted;
  }
  function sumTransaction(param) {
    let initial = 0
    for(let item of param) {
      initial += item.amount
    }
    return initial
  }

  return (
    <main className="home-container">
      <div className="wallet-container">
        <div className="card">
            <h4 className="card-title py-1">WALLET</h4>
          <div className="card-body py-4">
            <p className="card-text">&#8358;{sumTransaction(credits) - sumTransaction(debits)}</p>
          </div>
        </div>
        <div className="card">
            <h4 className="card-title py-1">CREDIT</h4>
          <div className="card-body py-4">
            <p className="card-text">&#8358;{sumTransaction(credits)}</p>
          </div>
        </div>
        <div className="card">
            <h4 className="card-title py-1">DEBIT</h4>
          <div className="card-body py-4">
            <p className="card-text">&#8358;{sumTransaction(debits)}</p>
          </div>
        </div>
      </div>
      <div className="history-div my-3">
        <div className="history">
          <h4>History</h4>
        </div>
        <div className="h-line"></div>
      </div>
      {!!sortTransactions().length ? (
        sortTransactions().map(({ _id, transaction, amount, updatedAt }) => (
          <div className="card mx-auto my-2" key={_id}>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-9 card-col">{transaction}</div>
                <div className="col-5 col-md-3 text-md-right card-col">
                  &#8358;{amount}
                </div>
                <div className="col-7 col-md-12">
                  {new Date(updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No transactions yet...</div>
      )}
    </main>
  );
}

export default Home;
