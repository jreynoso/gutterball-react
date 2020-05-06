import Box from '@material-ui/core/Box'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Frame from './Frame'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  }
}))

export default function PlayerLane ({ name, score, frames, currentFrame, isCurrentPlayer }) {
  const classes = useStyles()

  const fillFrames = (frames) => {
    const fullFrames = frames
    let frameCount = frames.length + 1
    while (fullFrames.length < 10) {
      fullFrames.push({
        number: frameCount++,
        rolls: [],
        score: 0
      })
    }
    return fullFrames
  }

  const fullFrames = fillFrames(frames)

  return (
    <Box border={1}>
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={4}><Box bgcolor={isCurrentPlayer ? 'info.main' : 'text.disabled'}>{name}</Box></Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {fullFrames && fullFrames.map((frame) => (
              <Grid key={frame.number} item xs={1}>
                <Frame className={classes.paper} {...frame} isCurrentFrame={currentFrame === frame.number}/>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div>Score: {score}</div>
    </Box>
  )
}

PlayerLane.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  frames: PropTypes.array,
  currentFrame: PropTypes.number,
  isCurrentPlayer: PropTypes.bool,
}
