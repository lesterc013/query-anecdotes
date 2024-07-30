const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      // Should use action.payload to contain the anecdote content
      // Likely dispatched in handleSubmit
      return `anecdote '${action.payload}'`
    }
    case 'VOTE': {
      // Dispatched in handleVote
      return `voted for '${action.payload}'`
    }
    case 'TOO_SHORT': {
      return action.payload
    }
    case 'CLEAR': {
      return null
    }
    default:
      return state
  }
}

export default notificationReducer
