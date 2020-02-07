import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import MainScreen from '../screens/MainScreen'
import PostScreen from '../screens/PostScreen'

import { THEME } from '../theme'
import BookedScreen from '../screens/BookedScreen'

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android' ? THEME.MAIN_COLOR : THEME.WHITE_COLOR,
    },
    headerTintColor:
      Platform.OS === 'android' ? THEME.WHITE_COLOR : THEME.MAIN_COLOR,
  },
}

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: PostScreen,
  },
  navigatorOptions
)

const BookedNavigator = createStackNavigator(
  {
    Booked: BookedScreen,
    Post: PostScreen,
  },
  navigatorOptions
)

const bottomTabsConfig = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: 'All',
      tabBarIcon: info => (
        <Ionicons name={'ios-albums'} size={25} color={info.tintColor} />
      ),
    },
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarIcon: info => (
        <Ionicons name={'ios-star'} size={25} color={info.tintColor} />
      ),
    },
  },
}

const BottomNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(bottomTabsConfig, {
        activeTintColor: THEME.WHITE_COLOR,
        shifting: true,
        barStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
      })
    : createBottomTabNavigator(bottomTabsConfig, {
        tabBarOptions: {
          activeTintColor: THEME.MAIN_COLOR,
        },
      })

const AppNavigation = createAppContainer(BottomNavigator)

export default AppNavigation
