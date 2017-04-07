const {BrowserWindow, remote} = require('electron')
const installExtension = require('electron-devtools-installer')
const {REACT_DEVELOPER_TOOLS} = require('electron-devtools-installer')

module.exports.createMainWindow = function () {
  let mainWindow = new BrowserWindow({width: 1280, height: 1024})

  mainWindow.loadURL(`file://${__dirname}/../../index.html`)
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.setMenu(null)
  mainWindow.setFullScreen(true)
  return mainWindow
}

module.exports.openDevTools = function (mainWindow) {
  mainWindow.webContents.openDevTools()
  require('electron-debug')({showDevTools: true})

  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))
}
