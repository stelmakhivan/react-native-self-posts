import createReducer from './createReducer'

const initialState = {
  allPosts: [],
  bookedPosts: [],
  loading: true,
}

const actionsMap = {
  ['LOAD_POSTS_SUCCEEDED']: posts => ({
    allPosts: posts,
    bookedPosts: posts.filter(post => post.booked),
    loading: false,
  }),
  ['TOGGLE_BOOKED_SUCCEEDED']: (id, { allPosts }) => {
    const posts = allPosts.map(post => {
      if (post.id === id) {
        post.booked = !post.booked
      }
      return post
    })
    return {
      allPosts: posts,
      bookedPosts: posts.filter(post => post.booked),
    }
  },
  ['REMOVE_POST_SUCCEEDED']: (id, { allPosts }) => ({
    allPosts: allPosts.filter(p => p.id !== id),
    bookedPosts: allPosts.filter(p => p.id !== id),
  }),
  ['ADD_POST_SUCCEEDED']: (post, { allPosts }) => {
    return {
      allPosts: [post, ...allPosts],
    }
  },
}

export const postReducer = createReducer(initialState, actionsMap)
