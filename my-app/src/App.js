import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';
import UserGlobalProvider from './hooks/UserGlobalProvider';
import './assets/css/main.css';
import Signin from './components/signin/Signin';

function App() {
  return (
    <UserGlobalProvider>
      <BrowserRouter>
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Signin} />
      </BrowserRouter>
    </UserGlobalProvider>
  )
}

export default App;
