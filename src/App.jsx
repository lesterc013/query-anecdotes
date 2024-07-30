import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createAnecdote, getAnecdotes, upvoteAnecdote } from './request'
import { useReducer } from 'react'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data

  const addAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      })
    },
  })

  const upvoteMutation = useMutation({
    mutationFn: upvoteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      })
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const upvoted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    upvoteMutation.mutate(upvoted)
    notificationDispatch({
      type: 'VOTE',
      payload: anecdote.content,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    addAnecdoteMutation.mutate({
      content,
      votes: 0,
    })
    notificationDispatch({
      type: 'ADD',
      payload: content,
    })
  }

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
      default:
        return state
    }
  }

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  if (result.isLoading) {
    return <div>Fetching data...</div>
  } else if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm handleSubmit={handleSubmit} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
