import React from "react";
import "./transaction.css"
import TransactionItem from "./TransactionItem";

function Transaction(props) {
    const { pathname, transactions } = props
  return (
    <main className="pt-3 transaction-container">
      <div className="title text-center">
        <h2>{pathname}</h2>
      </div>
      <div className="body mt-5">
        {
          !!transactions.length ? transactions.map(item => (
            <TransactionItem id={item._id} amount={item.amount} transaction={item.transaction} pathname={pathname} key={item._id} date={item.updatedAt} />
          )) : (
            <div className="text-center">No transactions yet...</div>
          )
        }
        
      </div>
    </main>
  );
}

export default Transaction;
