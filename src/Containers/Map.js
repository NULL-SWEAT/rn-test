import React, { Component } from 'react'
import { View, StyleSheet, PermissionsAndroid, Platform, Text, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

let markersCount = 0

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      markers: [],
      markersCount: 0
    }
    this.onMapPress = this.onMapPress.bind(this);
  }

  static navigationOptions = {
    title: 'react-native-maps',
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
      this.requestGeolocationPermission()
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: markersCount++,
        },
      ],
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.latitude && this.state.longitude ?
          (
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              onPress={this.onMapPress}
            >

              <Marker
                title={'Sua posição atual'}
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
                anchor={{ x: 0.69, y: 1 }}
              />

              {this.state.markers.map(marker => (
                <Marker
                  title={`Marker ${marker.key}`}
                  key={marker.key}
                  coordinate={marker.coordinate}
                />
              ))}

            </MapView>
          ) : <ActivityIndicator style={styles.loading} size="large" />
        }
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
