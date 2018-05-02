import React, { Component } from 'react'
import { StackNavigator, SwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import SignIn from '../Containers/SignIn'
import SignUp from '../Containers/SignUp'

import Camera from '../Containers/Camera'
import Home from '../Containers/Home'
import Map from '../Containers/Map'
import CameraGallery from '../Containers/CameraGallery'

import MapModal from '../Components/MapModal'

const AppStack = StackNavigator({
  Home: { screen: Home },
  Camera: { screen: Camera },
  Map: { screen: Map },
  CameraGallery: { screen: CameraGallery },
}, {
  // Default config for all screens
  headerMode: 'screen',
  // initialRouteName: 'Home',
});

const AuthStack = StackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp }
});

const RootStack = StackNavigator({
  Main: { screen: AppStack },
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
);
