export default function createReducer(initialState, reducerMap) {
  return function reducer(state = initialState, action = {}) {
    const actionReducer = reducerMap[action.type]
    if (actionReducer) {
      const stateUpdate = actionReducer(action.payload, state)
      return { ...state, ...stateUpdate }
    }
    return state
  }
}
