import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Root } from 'native-base'

import SwitchNavigator from '../Navigation/SwitchNavigator'

export default class App extends Component {
  render () {
    return (
      // <View style={styles.container}>
      <Root>
        <SwitchNavigator />
      </Root>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
