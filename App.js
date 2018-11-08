import React from 'react';
import { Button, Picker, StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SelectScreen from './components/SelectScreen';
import ShowScreen from './components/ShowScreen';
import SettingsScreen from './components/SettingsScreen';

const MainStack = createStackNavigator(
  {
    Select: SelectScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Select',
    /*navigationOptions: {
      headerStyle: {
        backgroundColor: 'dodgerblue',
      }
    }*/
  }
);

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    Show: ShowScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class AllergiesRadar extends React.Component {
  render() {
    return <RootStack />;
  }
}
