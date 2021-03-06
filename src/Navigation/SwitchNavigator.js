import React, { Component } from 'react'
import { StackNavigator, SwitchNavigator } from 'react-navigation'
import { Platform } from 'react-native'

import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import SignIn from '../Containers/SignIn'
import SignUp from '../Containers/SignUp'
import PasswordReset from '../Containers/PasswordReset'

import CameraScreen from '../Containers/CameraScreen'
import Home from '../Containers/Home'
import Map from '../Containers/Map'
import CameraGallery from '../Containers/CameraGallery'
import PolygonMap from '../Containers/PolygonMap'

import MapModal from '../Components/MapModal'
import { Colors } from '../Styles';

const AppStackNoPrefix = StackNavigator({
  Home: { screen: Home },
  CameraScreen: { screen: CameraScreen },
  Map: { screen: Map, path: 'map/:marker' },
  CameraGallery: { screen: CameraGallery },
  PolygonMap: { screen: PolygonMap },
}, {
  initialRouteName: 'Home',
  headerMode: 'screen',
  navigationOptions: {
    headerTintColor: Colors.white,
    headerStyle: { backgroundColor: Colors.banner },
    cardStyle: {
      backgroundColor: Colors.transparent,
      opacity: 1,
    },
  }
})

// Prefix for deep linking (NECESSARY????)
// const prefix = Platform.OS == 'android' ? 'testapp://testapp/' : 'testapp://'

// const AppStack = () => <AppStackNoPrefix uriPrefix={prefix} />

const AuthStack = StackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  PasswordReset: { screen: PasswordReset },
}, {
  navigationOptions: {
    headerTintColor: Colors.white,
    headerTransparent: true,
    },
    cardStyle: {
      backgroundColor: Colors.transparent,
      opacity: 1,
    },
})

const RootStack = StackNavigator({
  Main: { screen: AppStackNoPrefix },
  MapModal: { screen: MapModal },
},
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
