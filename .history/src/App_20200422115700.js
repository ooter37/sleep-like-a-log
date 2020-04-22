import React from 'react';
import './App.scss';
import './reset.css';
import './react-datepicker.min.css'
import {Route, Switch} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import axios from 'axios'
import {connect} from 'react-redux'
import requestUserData from './redux/reducers/user'

class App extends React.Component {
  componentDidMount(){
    axios.get('/auth/user-data').then(res => {
      console.log(res.data)
      // this.props.requestUserData(res.data)
    })
  }
  render(){
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
}

const mapDispatchToProps = {requestUserData}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(App)