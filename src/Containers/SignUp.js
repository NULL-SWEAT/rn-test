import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, ImageBackground } from 'react-native'
import firebase from 'react-native-firebase'
import { ApplicationStyles, Metrics, Images, Colors, Fonts } from '../Styles'
import { Button, Text } from 'native-base'

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
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />

        {/* <Text>Nome:</Text> */}
        <TextInput
            style={styles.input}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'Nome de usuário'}
            placeholderTextColor={Colors.white}
            underlineColorAndroid={Colors.transparent}
            selectionColor={Colors.fire}
          />

        {/* <Text>Email:</Text> */}
        <TextInput
          style={styles.input}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'E-mail'}
          placeholderTextColor={Colors.white}
          underlineColorAndroid={Colors.transparent}
          selectionColor={Colors.fire}
        />

        {/* <Text>Senha:</Text> */}
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Senha'}
          placeholderTextColor={Colors.white}
          underlineColorAndroid={Colors.transparent}
          selectionColor={Colors.fire}
        />

        <Button transparent light
          style={{ alignSelf: 'auto' }}
          onPress={this.emailSignUp.bind(this)}
        >
          <Text style={{ fontSize: Fonts.size.regular }}>Registrar-se</Text>
        </Button>
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
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: Colors.white,
    backgroundColor: Colors.coal,
    height: 40,
    width: '80%',
    margin: 5,
    padding: 10,
  },
})
