/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import * as firebaseui from "firebaseui";
import firebase from "firebase";

class PhoneLogin extends Component {
    componentDidMount() {
      if (!firebase.apps.length) {
        firebase.initializeApp({});
    }else {
        firebase.app(); // if already initialized, use that one
    }
    const uiConfig = {
      signInSuccessUrl: "/", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      tosUrl: "/"
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return (
      <>
      <h1>REACT PHONE AUTHENTICATION</h1>
      <div id="firebaseui-auth-container"></div>
      </>
    )
  }
}

export default PhoneLogin;
