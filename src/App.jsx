import React, { Component } from "react";
import { authenticate, register } from "./modules/auth";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import DisplayProductData from "./components/DisplayProductData"
class App extends Component {
  state = {
    renderLoginForm: false,
    renderRegistrationForm: false,
    authenticated: false,
    message: ""
  };

  onSignIn = async e => {
    let response;
    e.preventDefault();
    if (e.target.id === "signup") {
      response = await register(
        e.target.name.value,
        e.target.email.value,
        e.target.password.value,
        e.target.confirm_password.value
      );
    } else {
      response = await authenticate(
        e.target.email.value,
        e.target.password.value
      );
    }

    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({
        message: response.message[0],
        renderRegistrationForm: false,
        renderLoginForm: false
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
        renderRegister = <RegistrationForm submitFormHandler={this.onSignIn} />;
        break;
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onSignIn} />;
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
        <DisplayProductData/>
      </>
    );
  }
}

export default App;