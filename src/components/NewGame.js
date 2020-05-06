import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createGame } from '../service/Gutterball'

export default function NewGame () {
  const [gameId, setGameId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!gameId) {
      createGame().then(
        result => setGameId(result.id),
        () => setError('unable to create a new game')
      )
    }
  }, [gameId])

  return (
    <>
      {gameId && <Redirect to={{ pathname: `/game/${gameId}` }}/>}
      {error && <Redirect to={{ pathname: `/game/error` }}/>}
    </>
  )
}