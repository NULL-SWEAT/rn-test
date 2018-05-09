import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, ImageBackground } from 'react-native'
import firebase from 'react-native-firebase'
import { ApplicationStyles, Images, Colors, Fonts } from '../Styles'
import { Container, Content, Button, Text } from 'native-base'
import Loader from '../Components/Loader'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = { loading: false }
  }

  static navigationOptions = {
    title: 'Registrar-se',
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.centered}>
          <Loader loading={this.state.loading} />
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />

          <TextInput
            style={styles.authInputField}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'Nome de usuário'}
            placeholderTextColor={Colors.white}
            underlineColorAndroid={Colors.transparent}
            selectionColor={Colors.fire}
          />

          <TextInput
            style={styles.authInputField}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'E-mail'}
            placeholderTextColor={Colors.white}
            underlineColorAndroid={Colors.transparent}
            selectionColor={Colors.fire}
          />

          <TextInput
            style={styles.authInputField}
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
        </Content>
      </Container>
    )
  }

  emailSignUp = async () => {
    this.setState({ loading: true })
    const { email, password } = this.state
    try {
      const { user } = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      if (this.state.name) await user.updateProfile({ displayName: this.state.name })

      this.setState({ loading: false })

    } catch (error) {
      const { code, message } = error
      window.alert(message)
    }
  }
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
})
