import React, { Component } from 'react'
import { View, StyleSheet, PermissionsAndroid, Platform, Geolocation } from 'react-native'
import MapView from 'react-native-maps';

export default class Map extends Component {
  static navigationOptions = {
    title: 'react-native-maps',
  }

  componentWillMount() {
    if(Platform.OS === 'android' && !PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
      this.requestGeolocationPermission()
    }
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

  requestGeolocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Geolocation permission',
          'message': 'Geolocation permission'
        }
      )
    } catch (err) {
      console.warn(err)
    }
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
