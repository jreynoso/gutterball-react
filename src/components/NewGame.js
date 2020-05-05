import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export default function NewGame () {
  const [gameId, setGameId] = useState(null)

  useEffect(() => {
    if (!gameId) {
      setGameId(uuidv4()) // TODO: make api call to create a game
    }
  }, [gameId])

  return (
    <>
      {gameId && <Redirect to={{ pathname: `/game/${gameId}` }}/>}
    </>
  )
}