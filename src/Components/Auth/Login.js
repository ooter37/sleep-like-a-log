import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/user";
import "./Auth.scss";
import {authSuccess,errorLogin} from '../Alerts'

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
      .then(() => {
        this.setState({email: '', password: ''})
        this.props.redirect();
        authSuccess.fire({title: 'Signed in successfully.'})
      })
      .catch((err) => {
        errorLogin.fire({
          text: 'Incorrect username or password.',
      })
        // console.log("Error with login.", err)   // This causes a ~7 sec delay on login?
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
        <div className='login-text-container'>
          <h1>Welcome</h1>
          <p>Please login to continue.</p>
        </div>
        <form className='form-container' onSubmit={this.loginHandler}>
            <div className='login-input-container'>
              <input className='login-input-email'
                placeholder="email"
                type="text"
                name="email"
                required
                value={this.state.email}
                onChange={(e) => this.changeHandler(e)}
                />
              <input className='login-input-password'
                placeholder="password"
                type="password"
                name="password"
                required
                value={this.state.password}
                onChange={(e) => this.changeHandler(e)}
                />
            </div>
          <button className='button login-button auth-button'>Login</button>
        </form>
        {
          this.props.location
          ?
          null
          :
          <div className='need-register-container'>
            <p>Need an account?</p>
            <button className='button click-register-button auth-button' onClick={this.props.display}>Click to Register</button>
        </div>
        }
      </div>
    );
  }
}

export default connect(null, { login })(Login);
