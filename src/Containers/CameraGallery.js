import React, { Component } from 'react';
import {
  StyleSheet, Text, Image,
  View, ScrollView, Dimensions,
  TouchableOpacity, PermissionsAndroid,
  Platform, CameraRoll, ActivityIndicator
} from 'react-native';

export default class CameraGallery extends Component {
  constructor() {
    super()
    this.state = {
      photos: null
    }
  }

  componentWillMount() {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
      .then( r => {
        if (r === false && Platform.OS === 'android') {
          this.requestPermission()
        }
      })
  }

  componentDidMount() {
    CameraRoll.getPhotos({ first: 20, assetType: 'Photos' })
      .then(r => {
        this.setState({ photos: r.edges })
      })
      .catch((err) => {
        window.alert(err)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.photos !== null ? (
          <ScrollView>
            {this.state.photos.map((p, i) => {
              return (
                <Image
                  key={i}
                  style={styles.img}
                  source={{ uri: p.node.image.uri }}
                />
              )
            })}
          </ScrollView>
        ) : <ActivityIndicator style={styles.loading} size="large" />
        }
      </View>
    )
  }

  requestPermission = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Read from external storage Permission',
          'message': 'Read from external storage Permission needed to get photos'
        }
      )
    } catch (err) {
      console.warn(err)
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: Dimensions.get('window').width,
    height: 300,
    marginBottom: 10,
  }
})
