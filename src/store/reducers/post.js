const initialState = {
  allPosts: [],
  bookedPosts: [],
  loading: true,
}

const actionsMap = {
  ['LOAD_POSTS_SUCCEEDED']: (state, action) => ({
    ...state,
    allPosts: action.payload,
    bookedPosts: action.payload.filter(post => post.booked),
    loading: false,
  }),
  ['TOGGLE_BOOKED_SUCCEEDED']: (state, action) => {
    const allPosts = state.allPosts.map(post => {
      if (post.id === action.payload) {
        post.booked = !post.booked
      }
      return post
    })
    return {
      ...state,
      allPosts,
      bookedPosts: allPosts.filter(post => post.booked),
    }
  },
  ['REMOVE_POST_SUCCEEDED']: (state, action) => ({
    ...state,
    allPosts: state.allPosts.filter(p => p.id !== action.payload),
    bookedPosts: state.allPosts.filter(p => p.id !== action.payload),
  }),
  ['ADD_POST_SUCCEEDED']: (state, action) => ({
    ...state,
    allPosts: [action.payload, ...state.allPosts],
  }),
}

export const postReducer = (state = initialState, action) => {
  const actionReducer = actionsMap[action.type]
  return actionReducer ? { ...state, ...actionReducer(state, action) } : state
}
