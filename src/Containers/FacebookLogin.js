import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

// Create a graph request asking for user information with a callback to handle the response.
// const infoRequest = new GraphRequest(
//   '/me',
//   null,
//   this._responseInfoCallback,
// )

export default class FacebookLogin extends Component {
  render() {

    const infoRequest = new GraphRequest(
      '/me',
      null,
      this._responseInfoCallback,
    )

    return (
      <View>
        <LoginButton
          readPermissions={['public_profile', 'email', 'user_location']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                window.alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                window.alert("Login was cancelled");
              } else {
                window.alert("Login was successful with permissions: " + result.grantedPermissions)
                new GraphRequestManager().addRequest(this.infoRequest).start();
              }
            }
          }
          onLogoutFinished={() => window.alert("User logged out")}/>
      </View>
    );
  }

  //Create response callback.
  _responseInfoCallback(err, result) {
    if (err) {
      alert('Error fetching data: ' + JSON.stringify(err));
    } else {
      alert('Success fetching data: ' + JSON.stringify(result));
    }
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
