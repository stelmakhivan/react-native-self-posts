import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { THEME } from '../theme'

import MainScreen from '../screens/MainScreen'
import PostScreen from '../screens/PostScreen'
import BookedScreen from '../screens/BookedScreen'
import AboutScreen from '../screens/AboutScreen'
import CreateScreen from '../screens/CreateScreen'

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

const AboutNavigator = createStackNavigator(
  {
    About: AboutScreen,
  },
  navigatorOptions
)

const CreateNavigator = createStackNavigator(
  {
    Create: CreateScreen,
  },
  navigatorOptions
)

const MainNavigator = createDrawerNavigator(
  {
    PostTabs: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'About us',
      },
    },
    Create: {
      screen: CreateNavigator,
      navigationOptions: {
        drawerLabel: 'Create Post',
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: 'open-bold',
      },
    },
  }
)

const AppNavigation = createAppContainer(MainNavigator)

export default AppNavigation
