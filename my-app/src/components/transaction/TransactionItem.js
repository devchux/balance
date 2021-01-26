import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GetCreditData } from "../../context/CreditGlobalProvider";
import { GetDebitData } from "../../context/DebitGlobalProvider";

function TransactionItem({ id, amount, transaction, pathname }) {
  const { deleteCreditFromApi } = useContext(GetCreditData);
  const { deleteDebitFromApi } = useContext(GetDebitData);
  
  return (
    <div className="card mx-auto my-2">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-10 card-col">
            {transaction}
          </div>
          <div className="col-7 col-md-2 card-col">
            &#8358;{amount}
          </div>
          <div className="col-5 card-col">
            <p className="card-text">
              {pathname === "credits" ? (
                <>
              <Link to={`add/credits/${id}`}>Update</Link> | {" "}
                <Link
                  to="#"
                  onClick={() => {
                    deleteCreditFromApi(id);
                  }}
                  className="text-danger"
                >
                  Delete
                </Link>
                </>
              ) : (
                <>
              <Link to={`add/debits/${id}`}>Update</Link> | {" "} 
                <Link
                  to="#"
                  onClick={() => {
                    deleteDebitFromApi(id);
                  }}
                  className="text-danger"
                >
                  Delete
                </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
