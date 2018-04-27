import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase'

import FacebookLogin from './FacebookLogin'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  static navigationOptions = {
    title: 'Login',
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged( (user) => {
      this.setState({
        loading: false,
        user
      })
    })
  }

  componentWillUnmount() {
    this.authSubscription()
  }

  render() {
    if(this.state.loading) return(
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )

    if(this.state.user) return(
      this.props.navigation.navigate('App')
    )

    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />

        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.btn}
          onPress={this.emailLogin}
        >
          <Text>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text>Registrar-se</Text>
        </TouchableOpacity>

        <FacebookLogin />
      </View>
    )
  }

  emailLogin = () => {
    const { email, password } = this.state
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error
        window.alert(message)
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    width: 250,
    margin: 5
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#AAAAFF',
    padding: 10,
    margin: 5
  }
})
