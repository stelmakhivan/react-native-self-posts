import React, { useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import AppHeaderIcon from '../components/AppHeaderIcon'

import { THEME } from '../theme'
import { toggleBooked, removePost } from '../store/actions/post'

const PostScreen = ({ navigation }) => {
  const postId = navigation.getParam('postId')

  const dispatch = useDispatch()
  const post = useSelector(state =>
    state.post.allPosts.find(p => p.id === postId)
  )

  const booked = useSelector(state =>
    state.post.bookedPosts.some(p => p.id === postId)
  )

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.setParams({ booked })
    navigation.setParams({ toggleHandler, booked })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleHandler, booked])

  const removeHandler = () => {
    Alert.alert(
      'Deleting post',
      'Are you sure?!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress() {
            navigation.navigate('Main')
            dispatch(removePost(postId))
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    )
  }

  if (!post) {
    return null
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title={'Delete'}
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  )
}

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam('date')
  const booked = navigation.getParam('booked')
  const toggleHandler = navigation.getParam('toggleHandler')
  const iconName = booked ? 'ios-star' : 'ios-star-outline'
  return {
    headerTitle: `Post ${new Date(date).toLocaleDateString()}`,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title={'Take photo'}
          iconName={iconName}
          onPress={toggleHandler}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'open-regular',
  },
})

export default PostScreen
