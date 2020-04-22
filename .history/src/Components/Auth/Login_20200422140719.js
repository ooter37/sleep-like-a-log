import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/user";
import "./Auth.scss";
import './Auth.scss'

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
      .catch((err) => console.log("Error with login.", err));
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
            value={this.state.email}
            onChange={(e) => this.changeHandler(e)}
          />
          <input
            placeholder="password"
            type="text"
            name="password"
            value={this.state.password}
            onChange={(e) => this.changeHandler(e)}
          />
          <button className='login-button'>Login</button>
        </form>
        <button className='login-button' onClick={this.props.display}>Click to Register</button>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
