import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
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

export default function Scoreboard ({ players, currentFrame }) {
  const classes = useStyles()

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {players && players.map((player) => (
            <Grid key={player.id} item>
              <PlayerLane className={classes.paper} {...player} currentFrame={currentFrame}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

Scoreboard.propTypes = {
  players: PropTypes.array,
  currentFrame: PropTypes.number,
}
