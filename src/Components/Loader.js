import React, { Component } from 'react'
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { Colors } from '../Styles'

export default class Loader extends Component {
  static propTypes = {
    loading: PropTypes.bool,
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.loading}
        onRequestClose={() => {}}
      >
        <View style={styles.bg}>
          <ActivityIndicator
            size='large'
            animating={this.props.loading}
            color={Colors.bloodOrange}
          />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.windowTint
  },
})
