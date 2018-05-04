import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, ImageBackground } from 'react-native'
import firebase from 'react-native-firebase'
import { Button, Text } from 'native-base'
import { ApplicationStyles, Images, Colors, Fonts } from '../Styles'

export default class PasswordReset extends Component {
  constructor() {
    super()
    this.state = {}
  }

  static navigationOptions = {
    title: 'Redefinir senha',
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='contain' />

        <TextInput
          style={styles.input}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'E-mail'}
          placeholderTextColor={Colors.white}
          underlineColorAndroid={Colors.transparent}
          selectionColor={Colors.fire}
        />

        <Button transparent light
          style={{ alignSelf: 'auto' }}
          onPress={this.passwordReset.bind(this)}
        >
          <Text style={{ fontSize: Fonts.size.regular }}>Redefinir Senha</Text>
        </Button>
      </View>
    )
  }

  passwordReset = () => {
    const { email } = this.state
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        window.alert('Um email foi enviado.')
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
