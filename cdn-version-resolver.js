const axios = require('axios')

async function resolveLatest(debug = false) {
  const version = {
    major: 1,
    minor: 0,
  }
  let stage = 'major'
  let searching = true
  while (searching) {
    const url = `http://js.honeybadger.io/v${version.major}.${version.minor}/honeybadger.min.js`
    try {
      if (debug) {
        console.info('fetching', url)
      }
      await axios.get(url, {
      });
      switch (stage) {
        case 'major':
          version.major++
          break
        case 'minor':
          version.minor++
      }
    }
    catch (err) {
      if (debug) {
        console.error(url, err.code, err.message)
      }
      if (stage === 'major') {
        stage = 'minor'
        version.major--
      } else {
        version.minor--
        searching = false
      }
    }
  }

  return `v${version.major}.${version.minor}`
}

module.exports = {
  resolveLatest
}
