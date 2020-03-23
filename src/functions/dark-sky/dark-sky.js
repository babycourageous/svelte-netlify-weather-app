/* eslint-disable */
const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  const API_URL = 'https://api.darksky.net/forecast'

  // pull lat and lng params out of query string
  const { lat, lng } = event.queryStringParameters

  // Get env var values defined in our Netlify site UI
  const { DARKSKY_API_KEY } = process.env

  const DARKSKY_URL = `${API_URL}/${DARKSKY_API_KEY}/${lat},${lng}`

  try {
    const response = await fetch(DARKSKY_URL, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }

    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}