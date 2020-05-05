import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/user";
import {authSuccess,errorLogin} from '../Alerts'
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
      .login(this.state).then(() => authSuccess.fire({title: 'Signed in successfully.'}))
      .catch((err) => {
        errorLogin.fire({
          text: 'Incorrect username or password.',
      })
        console.log("Error with login from header.", err)
      });
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div>

        <form  className="header-login-container" onSubmit={this.loginHandler}>
        <div className="header-input-container">
          <input className='header-login-input'
            placeholder="email"
            type="text"
            name="email"
            required
            value={this.state.email}
            onChange={(e) => this.changeHandler(e)}
            />
          <input className='header-login-input'
            placeholder="password"
            type="password"
            name="password"
            required
            value={this.state.password}
            onChange={(e) => this.changeHandler(e)}
            />
            </div>
          <button className='button header-login-button'>Login</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
