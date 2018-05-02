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
      region: {},
    }
    this.onMapPress = this.onMapPress.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
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
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
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
    this.props.navigation.navigate('MapModal', { newMarker: this.newMarker.bind(this), coordinate: e.nativeEvent.coordinate })
  }

  newMarker(coord, title, description) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: coord,
          key: markersCount++,
          title: title,
          description: description
        },
      ],
    })
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.latitude && this.state.longitude ?
          (
            <MapView
              style={styles.map}
              region={ this.state.region }
              onPress={this.onMapPress}
              onRegionChangeComplete={this.onRegionChangeComplete}
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
                  title={marker.title}
                  description={marker.description}
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
