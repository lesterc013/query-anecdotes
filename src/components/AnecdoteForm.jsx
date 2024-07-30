const AnecdoteForm = ({ handleSubmit }) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
