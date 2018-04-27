import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {}
  }

  static navigationOptions = {
    title: 'Registrar-se',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />

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
          onPress={this.emailSignUp}
        >
          <Text>Registrar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  emailSignUp = () => {
    const { email, password } = this.state
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => {
        if(this.state.name) user.updateProfile({ displayName: this.state.name })
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error
        window.alert(message)
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
    marginBottom: 15
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#AAAAFF',
    padding: 10,
    margin: 5
  }
})
