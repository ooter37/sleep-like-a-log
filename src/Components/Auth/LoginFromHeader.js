import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/user";
import Button from '@material-ui/core/Button'

import "./Auth.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.loginHandler = this.loginHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }
  loginHandler(e) {
    e.preventDefault();
    this.props
      .login(this.state)
      .catch((err) => {
        window.alert('Incorrect username or password.') 
        console.log("Error with login from landing.", err)
      });
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.loginHandler}>
          <input
            placeholder="email"
            type="text"
            name="email"
            required
            value={this.state.email}
            onChange={(e) => this.changeHandler(e)}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            required
            value={this.state.password}
            onChange={(e) => this.changeHandler(e)}
          />
          <Button color='primary' variant='contained' className='login-button'>Login</Button>
        </form>
        {
          this.props.location
          ?
          null
          :
        <Button color='primary' variant='contained' className='click-register-button' onClick={this.props.display}>Click to Register</Button>
        }
      </div>
    );
  }
}

export default connect(null, { login })(Login);
