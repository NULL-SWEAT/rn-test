import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import firebase from 'react-native-firebase'
import { Button, Text, Icon } from 'native-base'
import Loader from '../Components/Loader'
import { Fonts, Colors, Metrics } from '../Styles'

export default class FacebookLogin extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  componentWillUnmount() {
    this.setState({ loading: false})
  }

  render() {
    // const infoRequest = new GraphRequest(
    //   '/me',
    //   null,
    //   this._responseInfoCallback,
    // )

    return (
      <View>
        <Loader loading={this.state.loading} />
        {/* <TouchableOpacity style={styles.button}
          onPress={this.onLoginOrRegister}
        >
          <Text style={styles.buttonText}>Entrar com o Facebook</Text>
        </TouchableOpacity> */}
        <Button rounded style={styles.button}
          onPress={this.onLoginOrRegister}
        >
          {/* <Icon name='facebook-square' type='FontAwesome' /> */}
          <Text>Entrar com o Facebook</Text>
        </Button>
      </View>
        // <LoginButton
        //   readPermissions={['public_profile', 'email', 'user_location']}
        //   onLoginFinished={
        //     (error, result) => {
        //       if (error) {
        //         window.alert("Login failed with error: " + result.error);
        //       } else if (result.isCancelled) {
        //         window.alert("Login was cancelled");
        //       } else {
        //         window.alert("Login was successful with permissions: " + result.grantedPermissions)
        //         new GraphRequestManager().addRequest(this.infoRequest).start();
        //       }
        //     }
        //   }
        //   onLogoutFinished={() => window.alert("User logged out")} />
    );
  }

  onLoginOrRegister = () => {
    this.setState({ loading: true })
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          this.setState({ loading: false })
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
  button: {
    backgroundColor: Colors.facebook,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.section,
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  }
});
