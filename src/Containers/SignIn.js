import React, { Component } from 'react'
import { View, StyleSheet, TextInput, ActivityIndicator, Image, KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase'
import FacebookLogin from './FacebookLogin'
import TransparentButton from '../Components/TransparentButton'
import Separator from '../Components/Separator'
import { ApplicationStyles, Metrics, Images, Colors, Fonts } from '../Styles'

import { Container, Content, Button, Text, Footer } from 'native-base'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  static navigationOptions = {
    header: null,
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
      <Container style={styles.mainContainer}>
        <ActivityIndicator size="large" />
      </Container>
    )

    if(this.state.user) return(
      this.props.navigation.navigate('App')
    )

    return (
      <Container>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <Content contentContainerStyle={styles.centered}>

          <Text style={styles.logo}>LOGO AQUI</Text>

          <FacebookLogin />

          <Separator text='OU' />

          <TextInput
            style={styles.authInputField}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'Email'}
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

          {/* <TransparentButton
            onPress={this.emailLogin.bind(this)}
            text='Entrar'
          /> */}
          <Button bordered light
            style={styles.button}
            onPress={this.emailLogin.bind(this)}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </Button>

          <View style={{ flexDirection: 'column', marginTop: Metrics.doubleSection }}>
            <Button transparent light full
              style={styles.button}
              onPress={() => this.props.navigation.navigate('SignUp')}
            >
              <Text style={styles.buttonText}>Inscrever-se</Text>
            </Button>
            <Button transparent light full
              style={styles.button}
              onPress={() => this.props.navigation.navigate('PasswordReset')}
            >
              <Text style={styles.buttonText}>Redefinir Senha</Text>
            </Button>
          </View>
        </Content>
      </Container>
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
      })
  }
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'auto',
  },
  buttonText: {
    fontSize: Fonts.size.regular,
  },
  logo: {
    color: Colors.white,
    fontSize: Fonts.size.h2,
    margin: 35,
  },
})
