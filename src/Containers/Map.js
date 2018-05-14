import React, { Component } from 'react'
import { View, StyleSheet, PermissionsAndroid, Platform, Text, Switch } from 'react-native'
import MapView, { Marker, Callout, MAP_TYPES } from 'react-native-maps'
import Loader from '../Components/Loader'
import CustomCallout from '../Components/CustomCallout'
import { Colors, Fonts } from '../Styles'
// import ShareButton from '../Components/ShareButton'
import firebase from 'react-native-firebase'

let markersCount = 4

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      markers: [],
      region: {},
      mapType: 'standard',
      switchMapType: false,
      loading: true,
    }
    this.onMapPress = this.onMapPress.bind(this)
    this.db = firebase.firestore()
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
    // get markers in real time from Firestore db
    const dbMarkers = this.db.collection('markers')
    dbMarkers.onSnapshot((querySnapshot) => {
      this.setState({ markers: [] })
      querySnapshot.forEach((marker) => {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              ...marker.data(),
              key: marker.id
            }
          ]
        })
      })
      var source = querySnapshot.metadata.fromCache ? "local cache" : "server";
      console.log("Data came from " + source);
    })

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
    this.props.navigation.navigate('MapModal', { newMarker: this.newMarker.bind(this), event: e.nativeEvent })
  }

  newMarker = async (coord, title, description) => {
    try {
      const newMrk = await this.db.collection('markers').add({
        coordinate: coord,
        title: title,
        description: description
      })
      if(newMrk) window.alert('Novo marker salvo')
    } catch(err) {
      console.warn(err)
    }

    // this.setState({
    //   markers: [
    //     ...this.state.markers,
    //     {
    //       coordinate: coord,
    //       key: markersCount++,
    //       title: title,
    //       description: description
    //     },
    //   ],
    // })
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
            onPoiClick={this.onMapPress}
            mapType={this.state.mapType}
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
                key={marker.key}
                coordinate={marker.coordinate}
              >
                <Callout tooltip>
                  <CustomCallout>
                    <Text>{marker.title}</Text>
                    <Text>{marker.description}</Text>
                    {/*   BUTTON INSIDE CALLOUT DOESN'T WORK   */}
                    {/* <ShareButton title={marker.title} url={`testapp://map/${marker.key}`} /> */}
                  </CustomCallout>
                </Callout>
              </Marker>
            ))}

          </MapView>

          <View style={styles.buttonContainer}>
            <Text style={Fonts.size.small}>Mapa</Text>
            <Switch
              value={this.state.switchMapType}
              onValueChange={
                (v) => {
                  const type = this.state.mapType === 'standard' ? 'hybrid' : 'standard'
                  this.setState({ mapType: type, switchMapType: v })
                }
              }
            />
            <Text style={Fonts.size.small}>Satélite</Text>
          </View>
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
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
