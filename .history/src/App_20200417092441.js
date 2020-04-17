import React from 'react';
import './App.css';
import './reset.css';
import {Route, Switch} from 'react-router-dom'
import Register from './Components/Register/Register'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/register' component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
