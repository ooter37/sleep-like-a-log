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
      <div className="auth">
        <form onSubmit={this.registrationHandler}>
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
          <button className='register-button'>Register</button>
        </form>
        <button onClick={this.props.display}>I Already Registered!</button>
      </div>
    );
  }
}

export default connect(null, { register })(Register);
