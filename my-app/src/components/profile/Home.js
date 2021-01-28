import React, { useState, useContext, useEffect } from "react";
import { GetCreditData } from "../../context/CreditGlobalProvider";
import { GetDebitData } from "../../context/DebitGlobalProvider";
import { GetUserData } from "../../context/UserGlobalProvider";
import './home.css'

function Home() {
  const [credit, setCredit] = useState({});
  const [debit, setDebit] = useState({});

  const { state: credits, getCreditFromApi } = useContext(GetCreditData)
  const { state: debits, getDebitFromApi } = useContext(GetDebitData)

  useEffect(() => {
    getCreditFromApi()
    getDebitFromApi()
  },[])

  console.log(credits, debits)
  return (
    <div className="home-container">
      <div className="card">
        <div className="card-body">
            <div className="transactions">
                <div className="credit text-primary" title="credit">
                    &#8358;3000
                </div>
                <div className="debit text-danger" title="debit">
                    &#8358;-3000
                </div>
            </div>
            <div className="balance">
                <h4 className="card-title">&#8358;6000</h4>
            </div>
          <p className="card-text">Text</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
