import React from 'react';
import './App.css';
import './reset.css';
import {Route, Switch} from 'react-router-dom'
import Register from './Components/Register/Register'
import Header from './Components/Header/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
