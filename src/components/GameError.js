import React from 'react'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import '../App.css'

export default function GameError (error) {
  return (
    <div className="App">
      <Alert severity="error">{error}</Alert>
      <Link to="/">Back</Link>
    </div>
  )
}