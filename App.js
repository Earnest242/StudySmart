/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppScreen from './navigation/personal1';
import Customdrawer from './navigation/customdrawer';
import SignUp2 from './screens/signUp';
import Icon from 'react-native-vector-icons/AntDesign';
import settings from './screens/settings';
const Drawer = createDrawerNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 4000);
  }
  render() {
    let Splash_Screen = (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          //margin: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <Image
          source={require('./assets/splashImage.png')}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <Customdrawer {...props} />}
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: 'dodgerblue',
            drawerActiveTintColor: 'white',
            drawerInactiveTintColor: 'dodgerblue',
          }}>
          <Drawer.Screen
            name="Home"
            component={AppScreen}
            options={{
              drawerIcon: ({color}) => (
                <Icon name="home" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="profile"
            component={SignUp2}
            options={{
              drawerIcon: ({color}) => (
                <Icon name="user" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="settings"
            component={settings}
            options={{
              drawerIcon: ({color}) => (
                <Icon name="setting" size={24} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
        {this.state.isVisible === true ? Splash_Screen : null}
      </NavigationContainer>
    );
  }
}
