import {} from './fileExplorer.scss'
import React from 'react'
import _ from 'lodash'
import pathUtils from 'path'
import {remote} from 'electron'
import FileLink from '../fileLink/fileLink.js'
import SettingsBar from '../settings/settingsBar/settingsBar.js'
import {clean, readDir, isDir} from '../utils/utils.js'
import {
  HOME,
  MAX_FILE_I,
  SPECIAL_RIGHT,
  SPECIAL_LEFT,
  SPECIAL_ENTER,
  ESC,
  DEFAULT_ROOT,
  LARGE
} from '../utils/consts.js'
import newStateSelection from './newStateSelection.js'
const playVideo = remote.require('./src/playVideo/playVideo.js')
const tts = remote.require('./src/tts/tts.js')
const {dbGet, dbSet} = remote.require('./src/db/db.js')

export default class FileExplorer extends React.Component {

  state = {
    files: [],
    debounce: Number(dbGet('debounce', 500)),
    playerPath: dbGet('playerPath', null),
    size: dbGet('size', LARGE),
    fontSize: dbGet('fontSize', null),
    root: dbGet('root', DEFAULT_ROOT),
    showSettings: false || dbGet('playerPath', null) === null
  }

  getClasses = () => {
    const cursorClass = this.state.showSettings ? '' : ' no-cursor'
    const playerClass = this.state.playerPath ? '' : ' no-player'
    return `file-explorer-container ${cursorClass} ${playerClass}`
  }

  handleReadDirFinished = (path, files) => {
    const newFiles = path !== this.state.root ? _.concat([HOME], files) : files
    this.setState(({size}) => (
      {path, files: newFiles, from: 0, to: MAX_FILE_I[size], selected: 0}
    ))
  }

  handleEnter = () => {
    const selectedFile = this.state.files[this.state.selected]
    const selectedPath = pathUtils.join(this.state.path, selectedFile)

    if (selectedFile === HOME) {
      readDir(this.state.root, this.handleReadDirFinished)
    } else if (isDir(selectedPath)) {
      readDir(selectedPath, this.handleReadDirFinished)
    } else {
      playVideo(this.state.path, this.state.files[this.state.selected])
    }
  }

  speak = () => tts(clean(this.state.files[this.state.selected]))

  handleKeyDown = e => {
    switch (e.keyCode) {
      case SPECIAL_RIGHT:
        this.setState(prevState => newStateSelection(prevState, SPECIAL_RIGHT), this.speak)
        break
      case SPECIAL_LEFT:
        this.setState(prevState => newStateSelection(prevState, SPECIAL_LEFT), this.speak)
        break
      case SPECIAL_ENTER:
        this.handleEnter()
        break
      case ESC:
        this.setState(({showSettings}) => ({showSettings: !showSettings}))
        break
      default:
    }
    if (!this.state.showSettings) {
      e.preventDefault()
    }
  }

  handleKeyDownDebounced = _.debounce(this.handleKeyDown, this.state.debounce)

  handlePlayerPathChange = value => {
    this.setState({playerPath: value}, () => dbSet('playerPath', value))
  }

  handleSizeChange = ({target: {value}}) => {
    this.setState(prevState => newStateSelection(_.assign(prevState, {size: value})), () => {
      dbSet('size', value)
    })
  }

  handleFontSizeChange = ({target: {value}}) => {
    this.setState({fontSize: value}, () => dbSet('fontSize', value))
  }

  handleDebounceChange = ({target: {value}}) => {
    this.setState({debounce: value}, () => {
      dbSet('debounce', value)
      document.removeEventListener('keydown', this.handleKeyDownDebounced)
      this.handleKeyDownDebounced = _.debounce(this.handleKeyDown, this.state.debounce)
      document.addEventListener('keydown', this.handleKeyDownDebounced)
    })
  }

  handleRootChange = root => {
    dbSet('root', root)
    this.setState({root})
    readDir(root, this.handleReadDirFinished)
  }

  constructor(props) {
    super(props)
    readDir(this.state.root, this.handleReadDirFinished)
    document.addEventListener('keydown', this.handleKeyDownDebounced)
  }

  render() {
    const shownFiles = _.slice(this.state.files, this.state.from, this.state.to + 1)
    const fileLinks = _.map(shownFiles, (file, i) => (
      <FileLink key={i}
                name={clean(file)}
                size={this.state.size}
                fontSize={this.state.fontSize}
                isSelected={this.state.selected === this.state.from + i}
                isFolder={file !== HOME && isDir(pathUtils.join(this.state.path, file))}/>
    ))

    return (
      <div className={this.getClasses()}>
        {this.state.showSettings &&
        <SettingsBar size={this.state.size}
                     onSizeChange={this.handleSizeChange}
                     fontSize={this.state.fontSize}
                     onFontSizeChange={this.handleFontSizeChange}
                     debounce={this.state.debounce}
                     onDebounceChange={this.handleDebounceChange}
                     playerPath={this.state.playerPath}
                     onPlayerPathChange={this.handlePlayerPathChange}
                     path={this.state.root}
                     onPathChange={this.handleRootChange}/>}
        {fileLinks}
      </div>
    )
  }
}
