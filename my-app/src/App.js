import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./components/signup/Signup";
import UserGlobalProvider from "./context/UserGlobalProvider";
import "./assets/css/main.css";
import Signin from "./components/signin/Signin";
import Dashboard from "./components/dashboard/Dashboard";
import CreditGlobalProvider from "./context/CreditGlobalProvider";
import DebitGlobalProvider from "./context/DebitGlobalProvider";
import Page404 from "./components/404/Page404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserGlobalProvider>
      <CreditGlobalProvider>
        <DebitGlobalProvider>
          <BrowserRouter>
          <Switch>
              <Route path="/dashboard" exaxt component={Dashboard} />
              <Route path="/register" exaxt component={Signup} />
              <Route path="/login" exaxt component={Signin} />
              <Route component={Page404} />
              </Switch>
          </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />
        </DebitGlobalProvider>
      </CreditGlobalProvider>
    </UserGlobalProvider>
  );
}

export default App;
