import React from 'react'
import { Link } from 'react-router-dom'
import Alert from '@material-ui/core/Snackbar'
import '../App.css'

export default function GameError () {
  return (
    <div className="App">
      <Alert severity="error">This is an error message!</Alert>
      <Link to="/">Back</Link>
    </div>
  )
}