import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, ImageBackground } from 'react-native'
import firebase from 'react-native-firebase'
import { Container, Content, Button, Text } from 'native-base'
import { ApplicationStyles, Images, Colors, Fonts, Metrics } from '../Styles'

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
      <Container>
        <Content contentContainerStyle={styles.centered}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />

          <TextInput
            style={styles.authInputField}
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
        </Content>
      </Container>
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
})
