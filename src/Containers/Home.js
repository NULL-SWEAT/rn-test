import React, { Component } from 'react'
import { View, StyleSheet, Button, AsyncStorage } from 'react-native'

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button
            onPress={() => this.props.navigation.navigate('Camera')}
            title='Camera'
          />

          <Button
            onPress={this._signOutAsync}
            title='Sign Out'
          />
      </View>
    )
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
