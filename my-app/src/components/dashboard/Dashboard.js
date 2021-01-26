import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Page404 from "../404/Page404";
import AddTransaction from "../add/AddTransaction";
import Credit from "../credits/Credit";
import Debit from "../debits/Debit";
import Navbar from "../navbar/Navbar";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Switch>
        <Route exact path="/dashboard/credits" component={Credit} />
        <Route exact path="/dashboard/debits" component={Debit} />
        <Route exact path="/dashboard/add" component={AddTransaction} />
        <Route
          exact
          path="/dashboard/add/credits/:id"
          component={AddTransaction}
        />
        <Route
          exact
          path="/dashboard/add/debits/:id"
          component={AddTransaction}
        />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default Dashboard;
