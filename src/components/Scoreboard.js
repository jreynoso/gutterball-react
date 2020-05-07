import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import PlayerLane from './PlayerLane'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function Scoreboard ({ players, currentFrame, currentPlayer, winnerIds }) {
  const classes = useStyles()
  const player = players && players[currentPlayer - 1]
  const currentPlayerId = player && player.id

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {players && players.map((player) => (
          <Grid key={player.id} item>
            <PlayerLane
              className={classes.paper}
              currentFrame={currentFrame}
              isCurrentPlayer={player.id === currentPlayerId}
              isWinner={winnerIds.includes(player.id)}
              {...player}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

Scoreboard.propTypes = {
  players: PropTypes.array,
  currentFrame: PropTypes.number,
  currentPlayer: PropTypes.number,
  winnerIds: PropTypes.array
}
