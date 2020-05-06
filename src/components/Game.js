import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Scoreboard from './Scoreboard'
import { getGame, startGame, createPlayer, bowl } from '../service/Gutterball'

export default function Game () {
  const { id } = useParams()

  const [gameId] = useState(id)
  const [gameStatus, setGameStatus] = useState()
  const [players, setPlayers] = useState([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [bowling, setBowling] = useState(false)
  const [nextMax, setNextMax] = useState(10)

  const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max + 1))
  }

  const getNextPins = () => {
    const pins = randomInt(nextMax)
    setNextMax(pins < 10 ? 10 - pins : 10)
    return pins
  }

  useEffect(() => {
    if (gameId) {
      console.log('loading gameId=', gameId)
      getGame(gameId).then(game => {
          if (game) {
            setGameStatus(game.status)
            setPlayers(game.players)
            setCurrentFrame(game.currentFrame)
            setCurrentPlayer(game.nextPlayer)
            // TODO: Set next max based on last roll for player and frame
          }
        },
        () => {
          // TODO: handle error
        }
      )
    }
  }, [gameId])

  const addPlayer = () => {
    const playerName = `Player ${players.length + 1}` // TODO: custom player name
    console.log('adding a player')
    createPlayer(gameId, playerName).then(player => {
        if (player) {
          setPlayers(players.concat(player))
          setGameStatus('ready')
        }
      },
      () => {
        // TODO: handle error
      }
    )
  }

  const startGutterball = () => {
    console.log('starting game')
    startGame(gameId).then(game => {
        if (game) {
          setGameStatus(game.status)
          setCurrentFrame(game.currentFrame)
          setCurrentPlayer(game.nextPlayer)
        }
      },
      () => {
        // TODO: handle error
      }
    )
  }

  const bowlCurrentPlayer = () => {
    setBowling(true)
    const player = players[currentPlayer - 1]
    console.log(`bowling for current player ${currentPlayer}`)
    bowl(gameId, player.id, getNextPins()).then(game => {
        if (game) {
          setGameStatus(game.status)
          setPlayers(game.players)
          setCurrentFrame(game.currentFrame)
          setCurrentPlayer(game.nextPlayer)
          setBowling(false)
        }
      },
      () => {
        // TODO: handle error
        setBowling(false)
      }
    )
  }

  return (
    <div>
      <h1>Game: {gameId} ({gameStatus})</h1>
      <Button
        onClick={addPlayer}
        style={{ display: gameStatus === 'pending' && players && players.length < 4 ? 'inline' : 'none' }}
      >
        Add Player
      </Button>
      <Button
        onClick={startGutterball}
        style={{ display: gameStatus === 'ready'  ? 'inline' : 'none' }}
      >
        Start Game
      </Button>

      <Scoreboard players={players} currentFrame={currentFrame}/>

      <Button
        onClick={bowlCurrentPlayer}
        style={{ display: gameStatus === 'started' ? 'inline' : 'none' }}
        disabled={bowling}
      >
        Bowl
      </Button>
    </div>
  )
}
