const _ = require('lodash')
const fs = require('fs')
const validPrefix = "Error: Could not call remote function ''. Check that the function signature is correct. Underlying error: ENOENT: no such file or directory, lstat"

module.exports.isFile = path => {
  console.log(`fs_lstatSync_isFile_start: ${path}`)
  let isFileRes = false
  try {
    isFileRes = fs.lstatSync(path).isFile()
    console.log(`fs_lstatSync_isFile_succeeded: ${path} -> ${isFileRes}`)
  } catch (error) {
    if (_.startsWith(error, validPrefix)) {
      console.log(`fs_lstatSync_isFile_succeeded: ${path} -> ${false}`)
    } else {
      console.log(`fs_lstatSync_isFile_failed: ${path} -> ${error}`)
    }
  } finally {
    return isFileRes
  }
}
