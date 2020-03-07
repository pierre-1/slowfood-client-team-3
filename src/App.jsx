import React, { Component } from "react";
import { authenticate, register } from "./modules/auth";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

class App extends Component {
  state = {
    renderLoginForm: false,
    renderRegistrationForm: false,
    authenticated: false,
    message: ""
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  onRegister = async e => {
    e.preventDefault();
    const response = await register(
      e.target.email.value,
      e.target.password.value,
      e.target.password_confirmation.value
    );
    if (response.registred) {
      this.setState({ registred: true });
    } else {
      this.setState({
        message: response.message,
        renderRegistrationForm: false
      });
    }
  };

  render() {
    const {
      renderLoginForm,
      authenticated,
      message,
      renderRegistrationForm
    } = this.state;
    let renderLogin;
    let renderRegister;
    let renderSignIn;
    let renderResponse;

    switch (true) {
      case renderRegistrationForm && !authenticated:
        renderRegister = <RegistrationForm submitFormHandler={this.onRegister} />;
        break;
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !authenticated:
        renderSignIn = (
          <>
            <button
              id="render-signup"
              onClick={() => this.setState({ renderRegistrationForm: true })}
            >
              signup
            </button>
            <button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            <p id="message">{message}</p>
          </>
        );
        break;
      case authenticated:
        renderResponse= (
          <p id="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        break;
    }

    return (
      <>
        {renderLogin}
        {renderRegister}
        {renderResponse}
        {renderSignIn}
      </>
    );
  }
}

export default App;