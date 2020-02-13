import { createActionThunk } from 'redux-thunk-actions'
import * as FileSystem from 'expo-file-system'
import { DB } from '../../db'

export const loadPosts = createActionThunk('LOAD_POSTS', DB.getPosts)

export const toggleBooked = createActionThunk('TOGGLE_BOOKED', post => {
  DB.updatePost(post)
  return post.id
})

export const removePost = createActionThunk('REMOVE_POST', id => {
  DB.removePost(id)
  return id
})

export const addPost = createActionThunk('ADD_POST', post => {
  const fileName = post.img.split('/').pop()
  const newPath = FileSystem.documentDirectory + fileName

  FileSystem.moveAsync({
    to: newPath,
    from: post.img,
  })

  const payload = { ...post, img: newPath }
  const id = DB.createPost(payload)
  payload.id = id

  return payload
})
