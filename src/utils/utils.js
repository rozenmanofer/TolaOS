import pathUtils from 'path'
import _ from 'lodash'
import {remote} from 'electron'
const fs = remote.require('fs')
const validPrefix = "Error: Could not call remote function ''. Check that the function signature is correct. Underlying error: ENOENT: no such file or directory, lstat"

export const clean = name => {
  const junk = /(s\d+e\d+|the|1080p|720p|hdtv|x264|mkv|avi|mp4|WEBRip|WEB-DL|DIMENSION)/gi
  return _.chain(name)
    .replace(junk, '')
    .words(/[^(.| )]+/g)
    .slice(0, 3)
    .join(' ')
    .value()
}

export const readDir = (path, callback) => {
  console.log(`fs_readdir_start: ${path}`)
  fs.readdir(pathUtils.resolve(path), (error, files) => {
    if (error) {
      console.log(`fs_readdir_failed: ${path} -> ${error}`)
    } else {
      console.log(`fs_readdir_succeeded: ${path} -> ${files.length} files`)
    }
    callback(path, files)
  })
}

export const isDir = path => {
  console.log(`fs_lstatSync_isDirectory_start: ${path}`)
  let isDirRes = false
  try {
    isDirRes = fs.lstatSync(path).isDirectory()
    console.log(`fs_lstatSync_isDirectory_succeeded: ${path} -> ${isDirRes}`)
  } catch (error) {
    if (_.startsWith(error, validPrefix)) {
      console.log(`fs_lstatSync_isDirectory_succeeded: ${path} -> ${false}`)
    } else {
      console.log(`fs_lstatSync_isDirectory_failed: ${path} -> ${error}`)
    }
  } finally {
    return isDirRes
  }
}
