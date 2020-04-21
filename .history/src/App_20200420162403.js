import React from 'react';
import './App.scss';
import './reset.css';
import './react-datepicker.min.css'
import {Route, Switch} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/main' component={Main}/>
      </Switch>
    </div>
  );
}

export default App;
