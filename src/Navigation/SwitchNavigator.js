import React, { Component } from 'react'
import { StackNavigator, SwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import SignIn from '../Containers/SignIn'
import SignUp from '../Containers/SignUp'

import Camera from '../Containers/Camera'
import Home from '../Containers/Home'

const AppStack = StackNavigator({
  Home: { screen: Home },
  Camera: { screen: Camera },
}, {
  // Default config for all screens
  headerMode: 'screen',
  // initialRouteName: 'Home',
});

const AuthStack = StackNavigator({ SignIn: { screen: SignIn }, SignUp: { screen: SignUp } });

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
