import React from 'react';
import './App.css';
import './reset.css';
import {Route, Switch} from 'react-router-dom'
import Register from './Components/Register/Register'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
