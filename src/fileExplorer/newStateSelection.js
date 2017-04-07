import _ from 'lodash'
import {MAX_FILE_I, SPECIAL_RIGHT, SPECIAL_LEFT} from '../utils/consts.js'

export default ({selected, from, to, files, size}, direction) => {
  let newSelected
  const showSettings = !direction
  if (direction === SPECIAL_RIGHT) {
    newSelected = (selected + 1) % files.length
  }
  else if (direction === SPECIAL_LEFT) {
    newSelected = (selected - 1) % files.length
    if (newSelected < 0) {
      newSelected = files.length - 1
    }
  } else {
    newSelected = from
  }

  if (_.inRange(newSelected, from, to + 1) && direction) {
    return {selected: newSelected, size, showSettings}
  }

  let newFrom
  let newTo
  if (newSelected <= from) {
    newFrom = Math.max(0, newSelected - MAX_FILE_I[size])
    newTo = newSelected
  } else if (newSelected > to) {
    newFrom = newSelected
    newTo = Math.min(files.length - 1, newSelected + MAX_FILE_I[size])
  }

  if (newFrom === 0) {
    newTo = Math.min(files.length - 1, MAX_FILE_I[size])
  } else if (newTo === files.length - 1) {
    newFrom = Math.max(0, files.length - 1 - MAX_FILE_I[size])
  }

  return {
    selected: newSelected,
    from: newFrom,
    to: newTo,
    size,
    showSettings
  }
}
