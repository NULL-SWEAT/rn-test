import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import firebase from 'react-native-firebase'

import ShareButton from '../Components/ShareButton'

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    return (
      <View style={styles.container}>

        {/* <Text>{JSON.stringify(this.state.currentUser)}</Text> */}
        <Text>Email: {this.state.currentUser.email}</Text>
        <Text>Nome: {this.state.currentUser.displayName}</Text>

        <TouchableOpacity style={styles.btn}
          onPress={() => this.props.navigation.navigate('Camera')}
        >
          <Text>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}
          onPress={() => this.props.navigation.navigate('Map')}
        >
          <Text>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}
          onPress={this.firebaseSignOut}
        >
          <Text>Sign out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}
          onPress={this.deleteAcc}
        >
          <Text>Deletar conta</Text>
        </TouchableOpacity>

        <ShareButton
          message={'Testando compartilhamento...\nhttps://origammi.land'}
          title='Título'
          url='https://origammi.land'
        />
      </View>
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
  container: {
    flex: 1
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#AAAAFF',
    padding: 10,
    margin: 5
  }
})
