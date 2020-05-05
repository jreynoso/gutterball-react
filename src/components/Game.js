import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Scoreboard from './Scoreboard'

export default function Game () {
  const { id } = useParams()
  // TODO: load game state from id or error if not exists
  const [gameId] = useState(id)
  const [gameStatus, setGameStatus] = useState('SETUP') // TODO: Get status from game state
  const [players, setPlayers] = useState([])            // TODO: Get players from game state
  const [currentFrame, setCurrentFrame] = useState(0)   // TODO: Get players from game state
  const [bowling, setBowling] = useState(false)

  const addPlayer = () => {
    // TODO: create a new player
    setPlayers(players.concat(fakePlayers[players.length]))
  }

  const startGame = () => {
    // TODO: start game
    setGameStatus('STARTED')
    setCurrentFrame(1)
  }

  const bowl = () => {
    setBowling(true)
    // TODO: make bowl api call for player, update scoreboard for player, and unset bowling
  }

  return (
    <div>
      <h1>Game: {gameId} ({gameStatus})</h1>
      <Button
        onClick={addPlayer}
        style={{ display: players.length < 4 ? 'inline' : 'none' }}
      >
        Add Player
      </Button>
      <Button
        onClick={startGame}
        style={{ display: gameStatus === 'SETUP' && players.length > 0 ? 'inline' : 'none' }}
      >
        Start Game
      </Button>

      <Scoreboard players={players} currentFrame={currentFrame}/>

      <Button
        onClick={bowl}
        style={{ display: gameStatus === 'STARTED' ? 'inline' : 'none' }}
        disabled={!bowling}
      >
        Bowl
      </Button>
    </div>
  )
}

const fakePlayers = [{
  'id': 'e4cafe03-d313-430d-8afc-29a2e60e0659',
  'name': 'Assire var Anahid',
  'score': 171,
  'frames': [{
    'number': 1,
    'rolls': [2, 8],
    'score': 17
  }, {
    'number': 2,
    'rolls': [7, 3],
    'score': 20
  }, {
    'number': 3,
    'rolls': [10],
    'score': 20
  }, {
    'number': 4,
    'rolls': [4, 6],
    'score': 16
  }, {
    'number': 5,
    'rolls': [6, 4],
    'score': 19
  }, {
    'number': 6,
    'rolls': [9, 1],
    'score': 20
  }, {
    'number': 7,
    'rolls': [10],
    'score': 20
  }, {
    'number': 8,
    'rolls': [6, 4],
    'score': 12
  }, {
    'number': 9,
    'rolls': [2, 8],
    'score': 18
  }, {
    'number': 10,
    'rolls': [8, 1],
    'score': 9
  }]
}, {
  'id': 'd6df81fd-d114-4186-a550-f3559aeef7d3',
  'name': 'Francesca Findabair',
  'score': 272,
  'frames': [{
    'number': 1,
    'rolls': [10],
    'score': 30
  }, {
    'number': 2,
    'rolls': [10],
    'score': 30
  }, {
    'number': 3,
    'rolls': [10],
    'score': 30
  }, {
    'number': 4,
    'rolls': [10],
    'score': 30
  }, {
    'number': 5,
    'rolls': [10],
    'score': 30
  }, {
    'number': 6,
    'rolls': [10],
    'score': 30
  }, {
    'number': 7,
    'rolls': [10],
    'score': 30
  }, {
    'number': 8,
    'rolls': [10],
    'score': 30
  }, {
    'number': 9,
    'rolls': [10],
    'score': 21
  }, {
    'number': 10,
    'rolls': [10, 1, 0],
    'score': 11
  }]
}, {
  'id': '4ee80fa5-ca0e-4149-9e2d-022261f954f0',
  'name': 'Zoltan Chivay',
  'score': 63,
  'frames': [{
    'number': 1,
    'rolls': [10],
    'score': 30
  }, {
    'number': 2,
    'rolls': [10],
    'score': 21
  }, {
    'number': 3,
    'rolls': [10],
    'score': 11
  }, {
    'number': 4,
    'rolls': [1, 0],
    'score': 1
  }]
}, {
  'id': '0186dedf-1bc8-415c-93e9-30340a72cc11',
  'name': 'Carthia van Canten',
  'score': 62,
  'frames': [{
    'number': 1,
    'rolls': [10],
    'score': 30
  }, {
    'number': 2,
    'rolls': [10],
    'score': 20
  }, {
    'number': 3,
    'rolls': [10],
    'score': 11
  }, {
    'number': 4,
    'rolls': [0, 1],
    'score': 1
  }]
}]