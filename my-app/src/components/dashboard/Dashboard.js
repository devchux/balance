import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Page404 from "../404/Page404";
import AddTransaction from "../add/AddTransaction";
import Credit from "../credits/Credit";
import Debit from "../debits/Debit";
import Navbar from "../navbar/Navbar";
import Home from "../home/Home";
import "./dashboard.css";
import ProtectedRoute from "../protected route/ProtectedRoute";
import { GetUserData } from "../../context/UserGlobalProvider";

function Dashboard() {
  const { checkUser, state: { error } } = useContext(GetUserData)

  useEffect(()=>{
    checkUser()
  },[])

  return (
    <div className="dashboard-container">
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/dashboard/credits" user={localStorage.getItem('token')} error={error} component={Credit} />
        <ProtectedRoute exact path="/dashboard/debits" user={localStorage.getItem('token')} error={error} component={Debit} />
        <ProtectedRoute exact path="/dashboard/add" user={localStorage.getItem('token')} error={error} component={AddTransaction} />
        <ProtectedRoute
          exact
          path="/dashboard/add/credits/:id" user={localStorage.getItem('token')} error={error}
          component={AddTransaction}
        />
        <ProtectedRoute
          exact
          path="/dashboard/add/debits/:id" user={localStorage.getItem('token')} error={error}
          component={AddTransaction}
        />
        <ProtectedRoute exact path="/dashboard/home" user={localStorage.getItem('token')} error={error} component={Home} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default Dashboard;
