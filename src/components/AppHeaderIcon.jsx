import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import { THEME } from '../theme'

const AppHeaderIcon = props => {
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      IconComponent={Ionicons}
      color={Platform.OS === 'android' ? THEME.WHITE_COLOR : THEME.MAIN_COLOR}
    />
  )
}

export default AppHeaderIcon
