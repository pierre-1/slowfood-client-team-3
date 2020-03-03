import React, { Component } from "react";

import LoginForm from "./components/LoginForm";


class App extends Component {

  state = {
    renderLoginForm: false,
    authenticated: false,
    message: ""
  }

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            <p id='message'>{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <p id='message'>Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
        );
    }
  
  return (
    <>
      
      {renderLogin}
        
    </>
  );
  };
}

export default App;
