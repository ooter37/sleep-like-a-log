import React from "react";
import { connect } from "react-redux";
import { register } from "../../redux/reducers/user";
import "./Auth.scss";

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
        this.props.redirect();
      })
      .catch((err) => console.log("Error registering.", err));
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
          <p>Registering is easy. All you need to provide is an email address and password.</p>
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
          <button className='login-button'>Register</button>
        </form>
        {
          this.props.location
          ?
          null
          :
          <div className='need-register-container'>
            <p>Already have an account?</p>
            <button className='click-register-button' onClick={this.props.display}>Click to Login</button>
        </div>
        }
      </div>
    );

    return (
      <div className="login-container">
        <form onSubmit={this.registrationHandler}>
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
          <button className='login-button'>Register</button>
        </form>
        <button className='click-register-button' onClick={this.props.display}>Click to Login</button>
      </div>
    );
  }
}

export default connect(null, { register })(Register);
