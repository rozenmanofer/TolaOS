const pathUtils = require('path')
const exec = require('child_process').execFile
const {dbGet} = require('../db/db.js')

// use vlc with plugin http://vlcsrposplugin.sourceforge.net/
const playVideo = (path, fileName) => {
  const playerParams = [
    pathUtils.join(path, fileName),
    '--quiet',
    '--no-qt-error-dialogs'
  ]

  console.log(`on launch: ${fileName}`)
  exec(dbGet('playerPath', null), playerParams, (err, data) => {
    console.log(err)
    console.log(data.toString())
  })
}

module.exports = playVideo
