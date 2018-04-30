import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import firebase from 'react-native-firebase'

export default class FacebookLogin extends Component {
  render() {
    // const infoRequest = new GraphRequest(
    //   '/me',
    //   null,
    //   this._responseInfoCallback,
    // )

    return (
      <View>
        <TouchableOpacity style={styles.btnFb}
          onPress={this.onLoginOrRegister}
        >
          <Text style={styles.btnTxt}>Facebook login</Text>
        </TouchableOpacity>

        {/* <LoginButton
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
          onLogoutFinished={() => window.alert("User logged out")} /> */}
      </View>
    );
  }

  onLoginOrRegister = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'))
        }
        // Retrieve the access token
        return AccessToken.getCurrentAccessToken()
      })
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)

        // Login with the credential
        return firebase.auth().signInAndRetrieveDataWithCredential(credential)
      })
      .then((user) => {
      })
      .catch((error) => {
        const { code, message } = error
        window.alert(message)
      })
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
  btnFb: {
    alignItems: 'center',
    backgroundColor: '#3B5998',
    padding: 10,
    margin: 5
  },
  btnTxt: { color: '#FFF'},
});
