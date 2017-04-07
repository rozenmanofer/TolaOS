const app = require('electron').app
const ElectronData = require('electron-data')

const db = new ElectronData({
  path: app.getPath('userData'),
  filename: 'TolaOS_settings',
  autosave: true
})
console.log('db_location: ' + app.getPath('userData') + '\\TolaOS_settings.json')

const set = (key, value) => {
  db.set(key, value)
  console.log(`db_set: (${key}, ${value})`)
}

const get = (key, defaultValue) => {
  if (db.has(key)) {
    const value = db.get(key)
    console.log(`db_get: (${key}, ${defaultValue}) -> ${value}`)
    return value
  }
  set(key, defaultValue)
  return defaultValue
}

module.exports.dbGet = get
module.exports.dbSet = set
