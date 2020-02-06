import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { DATA } from '../data'
import Post from '../components/Post'
import AppHeaderIcon from '../components/AppHeaderIcon'

const MainScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    })
  }
  return (
    <View style={styles.center}>
      <FlatList
        data={DATA}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
      />
    </View>
  )
}

MainScreen.navigationOptions = {
  headerTitle: 'My blog',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title={'Take photo'}
        iconName={'ios-camera'}
        onPress={() => console.log('Press photo!')}
      />
    </HeaderButtons>
  ),
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title={'Toggle Drawer'}
        iconName={'ios-menu'}
        onPress={() => console.log('Toggle Drawer')}
      />
    </HeaderButtons>
  ),
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
})

export default MainScreen
