import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import AppHeaderIcon from '../components/AppHeaderIcon'
import { THEME } from '../theme'
import { addPost } from '../store/actions/post'

const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const img =
    'https://physicsworld.com/wp-content/uploads/2019/09/Concave-river.jpg'

  const saveHandler = () => {
    if (text) {
      const post = {
        text,
        date: new Date().toJSON(),
        booked: false,
        img,
      }
      dispatch(addPost(post))
      navigation.navigate('Main')
    }
  }
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create New Post</Text>
          <TextInput
            style={styles.textArea}
            placeholder={'Input some text'}
            value={text}
            multiline
            onChangeText={setText}
          />
          <Image
            source={{
              uri: img,
            }}
            style={{
              width: '100%',
              height: 200,
              marginBottom: 10,
            }}
          />
          <Button
            title={'Create Post'}
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Create Post',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title={'Toggle Drawer'}
        iconName={'ios-menu'}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
})

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10,
  },
  textArea: {
    padding: 10,
    marginBottom: 10,
  },
})

export default CreateScreen
