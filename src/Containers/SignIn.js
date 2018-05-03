import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, ActivityIndicator, Image } from 'react-native'
import firebase from 'react-native-firebase'
import FacebookLogin from './FacebookLogin'
import TransparentButton from '../Components/TransparentButton'
import { ApplicationStyles, Metrics, Images, Colors } from '../Styles'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  static navigationOptions = {
    title: 'Login',
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
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" />
      </View>
    )

    if(this.state.user) return(
      this.props.navigation.navigate('App')
    )

    return (
      <View style={styles.mainContainer}>
        <View style={styles.centered}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='contain' />

          <Text style={styles.logo}>LOGO AQUI</Text>

          <FacebookLogin />

          {/* <Text style={styles.sectionText}>Email:</Text> */}
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'Email'}
            placeholderTextColor={Colors.white}
            underlineColorAndroid={Colors.transparent}
            selectionColor={Colors.fire}
          />

          {/* <Text style={styles.sectionText}>Senha:</Text> */}
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Senha'}
            placeholderTextColor={Colors.white}
            underlineColorAndroid={Colors.transparent}
            selectionColor={Colors.fire}
          />

          <TransparentButton
            onPress={this.emailLogin.bind(this)}
            text='Entrar'
          />

          <TransparentButton
            onPress={() => this.props.navigation.navigate('SignUp')}
            text='Registrar-se'
          />
        </View>
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
  input: {
    color: Colors.white,
    backgroundColor: Colors.coal,
    height: 40,
    width: 250,
    margin: 5,
    padding: 10,
  },
  logo: {
    color: Colors.white,
    fontSize: 30,
    margin: 35,
  }
})
