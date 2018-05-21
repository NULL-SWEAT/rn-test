import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  CameraRoll,
  PermissionsAndroid
} from 'react-native'
import { RNCamera } from 'react-native-camera'

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'back',
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        .then( r => {
          if (!r) {
            this.requestCameraPermission()
          }
        })
    }
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  renderCamera() {
    return (
      <RNCamera
            ref={ref => { this.camera = ref; }}
            style = {styles.preview}
            type={this.state.type}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        >

        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>

          <TouchableOpacity
              onPress={this.toggleFacing.bind(this)}
              style = {styles.toggle}
          >
              <Text style={{fontSize: 14}}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {styles.capture}
          >
              <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('CameraGallery')}
              style = {styles.gallery}
          >
              <Text style={{fontSize: 14}}> Galeria </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCamera()}
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true }
      const data = await this.camera.takePictureAsync(options)
      // window.alert('base64:' + data.base64)
      await CameraRoll.saveToCameraRoll(data.uri)
    }
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Write to external storage Permission',
          'message': 'Write to external storage Permission needed to save photo'
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
    flexDirection: 'column',
    backgroundColor: 'gray'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  gallery: {
    flex: 0,
    position: 'absolute',
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15,
    margin: 20,
  },
  toggle: {
    flex:0,
    position: 'absolute',
    left: 0,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15,
    margin: 20,
  }
});
