import { Platform } from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import MainScreen from '../screens/MainScreen'
import PostScreen from '../screens/PostScreen'

import { THEME } from '../theme'

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: {
      screen: PostScreen,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === 'android' ? THEME.MAIN_COLOR : THEME.WHITE_COLOR,
      },
      headerTintColor:
        Platform.OS === 'android' ? THEME.WHITE_COLOR : THEME.MAIN_COLOR,
    },
  }
)
const AppNavigation = createAppContainer(PostNavigator)

export default AppNavigation
