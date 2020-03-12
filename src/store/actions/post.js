import { createActionThunk } from 'redux-thunk-actions'
import * as FileSystem from 'expo-file-system'
import { DB } from '../../db'

export const loadPosts = createActionThunk('LOAD_POSTS', DB.getPosts)

export const toggleBooked = createActionThunk('TOGGLE_BOOKED', async post => {
  try {
    await DB.updatePost(post)
    return post.id
  } catch (error) {
    console.log('[toggleBooked] error', error)
  }
})

export const removePost = createActionThunk('REMOVE_POST', async id => {
  try {
    await DB.removePost(id)
    return id
  } catch (error) {
    console.log('[removePost] error', error)
  }
})

export const addPost = createActionThunk('ADD_POST', async post => {
  try {
    const fileName = post.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    await FileSystem.moveAsync({
      to: newPath,
      from: post.img,
    })

    const payload = { ...post, img: newPath }
    const id = await DB.createPost(payload)
    payload.id = id

    return payload
  } catch (error) {
    console.log('[addPost] error', error)
  }
})
