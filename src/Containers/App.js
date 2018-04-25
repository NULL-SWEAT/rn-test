import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import SwitchNavigator from '../Navigation/SwitchNavigator'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <SwitchNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
