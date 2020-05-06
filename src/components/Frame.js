import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

function FramePins ({ xs, pins, hasBorder = false }) {
  return (
    <Grid item xs={xs}>
      <Box borderLeft={hasBorder ? 1 : 0} borderBottom={hasBorder ? 1 : 0}>
        {pins}
      </Box>
    </Grid>
  )
}

export default function Frame ({ number, rolls, score, isCurrentFrame }) {

  const formatRoll = (rollIdx, rolls) => {
    if (!rolls || rolls.length <= rollIdx) {
      return '\u00A0'
    }
    const roll = rolls[rollIdx]
    if (roll === 0) {
      return '-'
    } else if (rollIdx === 1) {
      return roll + rolls[0] === 10 ? '/' : roll === 10 ? 'X' : roll
    } else if (rollIdx === 2) {
      return roll + rolls[1] === 10 ? '/' : roll === 10 ? 'X' : roll
    } else if (roll === 10) {
      return 'X'
    } else if (rollIdx === 0) {
      return roll
    }
  }

  const lastFrame = number === 10
  const framePinXs = lastFrame ? 4 : 6

  return (
    <Box border={1} bgcolor={isCurrentFrame ? 'info.main' : ''}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box borderBottom={1} bgcolor={isCurrentFrame ? 'primary.main' : 'text.disabled'}>{number}</Box>
        </Grid>
        <Grid container direction="row"
              justify="flex-start"
              alignItems="flex-start"
              item xs={12}
        >
          <FramePins xs={framePinXs} pins={formatRoll(0, rolls)}/>
          <FramePins xs={framePinXs} pins={formatRoll(1, rolls)} hasBorder={true}/>
          {lastFrame && <FramePins xs={framePinXs} pins={formatRoll(2, rolls)} hasBorder={true}/>}
        </Grid>
        <Grid item xs={12}>
          <Box>{score || '\u00A0'}</Box>
        </Grid>
      </Grid>
    </Box>
  )
}

Frame.propTypes = {
  number: PropTypes.number,
  rolls: PropTypes.array,
  score: PropTypes.number
}
