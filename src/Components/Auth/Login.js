import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/user";

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
      .then(() => {
        this.props.redirect();
      })
      .catch((err) => {
        window.alert('Incorrect username or password.')
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
            type="text"
            name="password"
            required
            value={this.state.password}
            onChange={(e) => this.changeHandler(e)}
          />
          <button className='login-button'>Login</button>
        </form>
        {
          this.props.location
          ?
          null
          :
        <button className='click-register-button' onClick={this.props.display}>Click to Register</button>
        }
      </div>
    );
  }
}

export default connect(null, { login })(Login);
