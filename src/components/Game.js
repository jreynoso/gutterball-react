import Grid from '@material-ui/core/Grid'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Scoreboard from './Scoreboard'
import { getGame, startGame, createPlayer, bowl } from '../service/Gutterball'

export default function Game () {
  const { id } = useParams()

  const [gameId] = useState(id)
  const [gameStatus, setGameStatus] = useState(null)
  const [players, setPlayers] = useState([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [bowling, setBowling] = useState(false)
  const [nextMax, setNextMax] = useState(10)
  const [error, setError] = useState(null)
  const [winnerIds, setWinnerIds] = useState([])

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
      getGame(gameId).then(response => {
          if (response && response.id) {
            setGameStatus(response.status)
            setPlayers(response.players)
            setCurrentFrame(response.currentFrame)
            setCurrentPlayer(response.nextPlayer)
            setBowling(false)
            setError(null)

            if (response.status === 'started') {
              const player = response.players[response.nextPlayer - 1]
              const frame = player.frames[response.currentFrame - 1]
              if (frame) {
                const lastRoll = frame.rolls[frame.rolls.length - 1]
                setNextMax(lastRoll < 10 ? 10 - lastRoll : 10)
              }
            }
          } else {
            setError(`unable to find gameId=${gameId}: ${response}`)
          }
        },
        ex => setError(`unexpected error: ${ex}`)
      )
    }
  }, [gameId])

  useEffect(() => {
    if (gameStatus === 'completed') {
      let highestScore = 0
      let winners = []
      players.forEach(player => {
        if (player.score > highestScore) {
          winners = [player.id]
          highestScore = player.score
        } else if (player.score === highestScore) {
          winners.concat(player.id)
        }
      })
      setWinnerIds(winners)
    }
  }, [players, gameStatus])

  const addPlayer = () => {
    const playerName = `Player ${players.length + 1}` // TODO: custom player name
    createPlayer(gameId, playerName).then(response => {
        if (response && response.id) {
          setPlayers(players.concat(response))
          setGameStatus('ready')
          setError(null)
        } else {
          setError(`unable to add player to gameId=${gameId}: ${response}`)
        }
      },
      ex => setError(`unexpected error: ${ex}`)
    )
  }

  const startGutterball = () => {
    startGame(gameId).then(response => {
        if (response && response.id) {
          setGameStatus(response.status)
          setCurrentFrame(response.currentFrame)
          setCurrentPlayer(response.nextPlayer)
          setError(null)
        } else {
          setError(`unable to start gameId=${gameId}: ${response}`)
        }
      },
      ex => setError(`unexpected error: ${ex}`)
    )
  }

  const bowlCurrentPlayer = (pins) => {
    setBowling(true)
    if (pins === undefined) {
      pins = getNextPins()
    }
    const player = players[currentPlayer - 1]
    bowl(gameId, player.id, pins).then(response => {
        if (response && response.id) {
          setGameStatus(response.status)
          setPlayers(response.players)
          setCurrentFrame(response.currentFrame)
          setCurrentPlayer(response.nextPlayer)
          setError(null)
        } else {
          setError(`failed to bowl: ${response}`)
        }
        setBowling(false)
      },
      ex => setError(`unexpected error: ${ex}`)
    )
  }

  const canAddPlayers = (gameStatus === 'ready' || gameStatus === 'pending') && players && players.length < 4
  const currFrame = gameStatus !== 'completed' ?  currentFrame : 0
  const currPlayer = gameStatus !== 'completed' ?  currentPlayer : 0

  return (
    <Container>
      {error && <Alert severity="error"><AlertTitle>Error</AlertTitle>{error}</Alert>}
      <h1>Gutterball!</h1>
      <Scoreboard players={players} currentFrame={currFrame} currentPlayer={currPlayer} winnerIds={winnerIds}/>
      <Grid container justify={'center'} spacing={3}>
        <Button
          onClick={addPlayer}
          style={{ display: canAddPlayers ? 'inline' : 'none' }}
        >
          Add Player
        </Button>
        <Button
          onClick={startGutterball}
          style={{ display: gameStatus === 'ready' ? 'inline' : 'none' }}
        >
          Start Game
        </Button>
        <Button
          onClick={() => bowlCurrentPlayer()}
          style={{ display: gameStatus === 'started' ? 'inline' : 'none' }}
          disabled={bowling}
        >
          Bowl
        </Button>
        <Button
          onClick={() => bowlCurrentPlayer(10)}
          style={{ display: gameStatus === 'started' ? 'inline' : 'none' }}
          disabled={bowling}
        >
          Strike!
        </Button>
        <Link as={Button} to="/game"
              style={{ display: gameStatus === 'completed' ? 'inline' : 'none' }}
        >
          <Button>New Game</Button>
        </Link>
      </Grid>
    </Container>
  )
}
