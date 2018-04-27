import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps';

export default class Map extends Component {
  static navigationOptions = {
    title: 'react-native-maps',
  }

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 500,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
