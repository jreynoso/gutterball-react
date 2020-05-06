import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

export default function Frame ({ number, rolls, score, isCurrentFrame }) {

  const formatRolls = (rollIdx, rolls) => {
    const roll = rolls[rollIdx]
    if (roll === 0) {
      return '-'
    } else if (rollIdx === 0) {
      return roll === 10 ? 'X' : roll
    } else if (rollIdx === 1) {
      return roll + rolls[0] === 10 ? '/' : roll
    } else {
      return roll === 10 ? 'X' : roll + rolls[1] === 10 ? '/' : roll
    }
  }

  const hasFirstRoll = rolls && rolls.length > 0
  const hasSecondRoll = rolls && rolls.length > 1
  const hasThirdRoll = rolls && rolls.length > 2

  return (
    <Box color={isCurrentFrame ? 'text.primary' : 'text.secondary'}>
      <span>Frame #:{number}</span><br/>
      {hasFirstRoll && <span>{formatRolls(0, rolls)}</span>}
      {hasSecondRoll && <span> {formatRolls(1, rolls)}</span>}
      {hasThirdRoll && <span> {formatRolls(2, rolls)}</span>}
      <br/><span>Score: {score}</span>
    </Box>
  )
}

Frame.propTypes = {
  number: PropTypes.number,
  rolls: PropTypes.array,
  score: PropTypes.number
}
