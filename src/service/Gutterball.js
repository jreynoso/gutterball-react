import config from '../config/config.json'

const env = process.env.NODE_ENV || 'development'

function getApiUrl () {
  const envConfig = config[env]
  if (!envConfig || !envConfig.gutterball_api_url) {
    throw new Error(`gutterball_api_url is not configured for ${env}`)
  }
  return envConfig.gutterball_api_url
}

function postData (url = '', data = {}) {
  const apiUrl = getApiUrl()
  console.log('apiUrl=', apiUrl)
  return fetch(`${apiUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
  .then(response => response)
}

function getData (url = '') {
  const apiUrl = getApiUrl()
  console.log('apiUrl=', apiUrl)
  return fetch(`${apiUrl}${url}`)
  .then(r => r.json())
  .then(response => response)
}

function createGame () {
  return postData('/game')
  .then(response => response)
}

function getGame (id) {
  return getData(`/game/${id}`)
  .then(response => response)
}

function startGame (id) {
  return postData(`/game/${id}/start`)
  .then(response => response)
}

function createPlayer (id, name) {
  return postData(`/game/${id}/player`, { name })
  .then(response => response)
}

function bowl (id, playerId, pins) {
  return postData(`/game/${id}/player/${playerId}/bowl`, { pins })
  .then(response => response)
}

export {
  createGame,
  getGame,
  startGame,
  createPlayer,
  bowl
}