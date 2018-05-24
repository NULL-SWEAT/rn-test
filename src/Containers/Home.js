import React, { Component } from 'react'
import { View, StyleSheet, Linking, Platform } from 'react-native'
import firebase from 'react-native-firebase'
import { Container, Content, Button, Text, Footer, Icon } from 'native-base'

import ShareButton from '../Components/ShareButton'
import { ApplicationStyles, Metrics, Colors } from '../Styles';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  componentWillMount() {
    firebase.auth().currentUser.reload()
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  componentDidMount() {
    // Linking
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url)
      })
    }
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation
    const route = url.replace(/.*?:\/\//g, '')
    const id = route.match(/\/([^\/]+)\/?$/)[1]
    const routeName = route.split('/')[0]
    if (routeName === 'map') {
      navigate('Map', { id })
    }
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={[styles.centered, styles.bg]}>

          <Text style={{ color: Colors.white }}>Email: {this.state.currentUser.email}</Text>
          <Text style={{ color: Colors.white }}>Nome: {this.state.currentUser.displayName}</Text>

          <Button block iconLeft
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CameraScreen')}
          >
            <Icon style={styles.btnIcons} name='camera' />
            <Text style={styles.buttonText}>Camera</Text>
          </Button>

          <Button block iconLeft
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Map')}
          >
            <Icon style={styles.btnIcons} name='map' />
            <Text style={styles.buttonText}>Map</Text>
          </Button>

          <Button block iconLeft
            style={styles.button}
            onPress={() => this.props.navigation.navigate('PolygonMap')}
          >
            <Icon style={styles.btnIcons} name='map' />
            <Text style={styles.buttonText}>Polygon Map</Text>
          </Button>

          <Button block iconLeft
            style={styles.button}
            onPress={this.firebaseSignOut}
          >
            <Icon style={styles.btnIcons} name='exit' />
            <Text style={styles.buttonText}>Sign out</Text>
          </Button>

          <Button block danger iconLeft
            style={styles.button}
            onPress={this.deleteAcc.bind(this)}
          >
            <Icon style={styles.btnIcons} name='trash' />
            <Text style={styles.buttonText}>Deletar conta</Text>
          </Button>

          <ShareButton
            message='Testando compartilhamento.'
            title='Título'
            url='https://origammi.land'
          />
        </Content>
      </Container>
    )
  }

  firebaseSignOut = async () => {
    await firebase.auth().signOut()
    this.props.navigation.navigate('Auth')
  }

  deleteAcc = async () => {
    await firebase.auth().currentUser.delete()
    this.props.navigation.navigate('Auth')
  }
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  bg: {
    backgroundColor: Colors.coal,
  },
  btnIcons: {
    position: 'absolute',
    left: 0
  },
  button: {
    alignSelf: 'auto',
    width: '75%',
    marginVertical: Metrics.marginVertical,
  }
})
