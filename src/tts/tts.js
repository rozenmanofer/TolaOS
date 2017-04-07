const say = require('say')

const tts = text => {
  say.stop()
  say.speak(text)
}

module.exports = tts
