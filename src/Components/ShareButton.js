import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Share, Platform } from 'react-native'
import { Button, Icon, Text } from 'native-base';

import { Fonts, Colors, Metrics } from '../Styles'

export default class ShareButton extends Component {
  static propTypes = {
    message: PropTypes.String,
    title: PropTypes.string,
    url: PropTypes.string,
  }

  share() {
    const msg = Platform.OS === 'android' ? this.props.message + '\n' + this.props.url : this.props.message

    Share.share({
      message: msg,
      title: this.props.title,
      url: this.props.url,
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <View>
      <Button onPress={this.share.bind(this)}>
        <Icon name='share' />
      </Button>
      </View>
    )
  }

}
