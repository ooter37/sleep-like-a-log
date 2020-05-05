import React from "react";
import { connect } from "react-redux";
import { register } from "../../redux/reducers/user";
import "./Auth.scss";
import {authSuccess,errorLogin} from '../Alerts'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.registrationHandler = this.registrationHandler.bind(this);
  }
  registrationHandler(e) {
    e.preventDefault();
    this.props
      .register(this.state)
      .then(() => {
        this.setState({email: '', password: ''})
        this.props.redirect();
        authSuccess.fire({title: `Thanks for registering!`})
      })
      .catch((err) => {
        errorLogin.fire({text: 'That username is already in use. Please login.'})
        // console.log("Error registering.", err)
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
          <p>Registering is easy. Provide an email address and password to get started.</p>
        </div>
        <form className='form-container' onSubmit={this.registrationHandler}>
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
          <button className='button login-button auth-button'>Register</button>
        </form>
        {
          this.props.location
          ?
          null
          :
          <div className='need-register-container'>
            <p>Already have an account?</p>
            <button className='button click-register-button auth-button' onClick={this.props.display}>Click to Login</button>
        </div>
        }
      </div>
    );
  }
}

export default connect(null, { register })(Register);
