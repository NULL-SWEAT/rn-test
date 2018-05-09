import React, { Component } from 'react'
import { View, StyleSheet, PermissionsAndroid, Platform, Text, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Loader from '../Components/Loader'

let markersCount = 0

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      markers: [
        {"coordinate":{"longitude":-53.46138205379248,"latitude":-24.95291957703744},"key":0,"title":"Origammi","description":"Origammi.land"},
        {"coordinate":{"longitude":-118.25775694102049,"latitude":33.92945673257313},"key":1,"title":"LA","description":"Paradise on Earth"},
        {"coordinate":{"longitude":-122.17631276696922,"latitude":37.416097944926},"key":2,"title":"Silicon Valley","description":"IT"},
        {"coordinate":{"longitude":-122.38521862775087,"latitude":41.42060692063931},"key":3,"title":"Weed","description":"City called Weed"}
      ],
      region: {},
      loading: true,
    }
    this.onMapPress = this.onMapPress.bind(this)
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
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        }, this.setInitialRegion)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  }

  setInitialRegion() {
    // Get marker from the linking uri - if a marker id has been passed then set it as the initialRegion
    if (this.props.navigation.state.params !== undefined) {
      const { id } = this.props.navigation.state.params
      if (this.state.markers[id]) {
        this.setState({
          region: {
            latitude: this.state.markers[id].coordinate.latitude,
            longitude: this.state.markers[id].coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
        })
      } else {  // else use current location
        this.setCurrentToRegion()
      }
    } else {
      this.setCurrentToRegion()
    }
  }

  setCurrentToRegion() {
    this.setState({
      region: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
    })
    this.setState({ loading: false })
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

  render() {

    if (this.state.region.latitude &&
      this.state.region.longitude &&
      this.state.latitude) {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
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
                title={marker.title}
                description={marker.description}
                key={marker.key}
                coordinate={marker.coordinate}
              />
            ))}

          </MapView>
        </View>
      )
    }

    return (
      <Loader loading={this.state.loading} />
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
