const {app} = require('electron')
const {createMainWindow, openDevTools} = require('./src/mainWindow/mainWindow.js');

let mainWindow

app.on('ready', ()=> {
  mainWindow = createMainWindow()
  //openDevTools(mainWindow);
})

// In this file you can include the rest of your mainWindow's specific main process
// code. You can also put them in separate files and require them here.
