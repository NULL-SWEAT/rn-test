import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import { Fonts, Colors, Metrics } from '../Styles'

export default class Separator extends Component {
  static propTypes = {
    text: PropTypes.string,
  }

  getText() {
    const separatorText = this.props.text || this.props.children || ''
    return separatorText.toUpperCase()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bar} />
        <Text style={styles.text}>{this.getText()}</Text>
        <View style={styles.bar} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 4,
    width: '34%',
    marginHorizontal: Metrics.baseMargin,
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Fonts.size.regular,
  }
})
