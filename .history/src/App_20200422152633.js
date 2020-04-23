import React from 'react';
import './App.scss';
import './reset.css';
import './react-datepicker.min.css'
import {Route, Switch} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Main from './Components/Main/Main'
import {connect} from 'react-redux'
import {requestUserData} from './redux/reducers/user'
import Graph from './Components/Charts/Graph'

class App extends React.Component {
  componentDidMount(){
      this.props.requestUserData()
  }
  render(){
    return (
      <div className="App">
      <Graph/>
      <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/main' component={Main}/>
      </Switch>
    </div>
  );
}
}

const mapDispatchToProps = {requestUserData}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(App)