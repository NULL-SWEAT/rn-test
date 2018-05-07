import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Share } from 'react-native'
import { Button, Icon, Text } from 'native-base';

import { Fonts, Colors, Metrics } from '../Styles'

export default class ShareButton extends Component {
  static propTypes = {
    message: PropTypes.String,
    title: PropTypes.string,
    url: PropTypes.string,
  }

  share() {
    Share.share({
      message: this.props.message,
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
