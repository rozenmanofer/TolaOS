import {} from './settingsBar.scss'
import React from 'react'
import {MEDIUM, LARGE, XLARGE} from '../../utils/consts.js'
import {version} from '../../../package.json'
import SizeControl from '../sizeControl/sizeControl.js'
import FontSizeControl from '../fontSizeControl/fontSizeControl.js'
import DebounceControl from '../debounceControl/debounceControl.js'
import PlayerPathControl from '../playerPathControl/playerPathControl.js'
import PathControl from '../pathControl/pathControl.js'

const Settings = props => (
  <div className="settings-bar-container">
    <SizeControl onChange={props.onSizeChange} value={props.size}/>
    <FontSizeControl onChange={props.onFontSizeChange}
                             value={props.fontSize}/>
    <PathControl onAccept={props.onPathChange} value={props.path}/>
    <DebounceControl onChange={props.onDebounceChange} value={props.debounce}/>
    <PlayerPathControl onChange={props.onPlayerPathChange} value={props.playerPath}/>
    <span className="version">TolaOS {version}</span>
  </div>
)

Settings.propTypes = {
  onSizeChange: React.PropTypes.func.isRequired,
  onFontSizeChange: React.PropTypes.func.isRequired,
  size: React.PropTypes.oneOf([MEDIUM, LARGE, XLARGE]).isRequired,
  fontSize: React.PropTypes.string,
  onDebounceChange: React.PropTypes.func.isRequired,
  debounce: React.PropTypes.number.isRequired,
  onPlayerPathChange: React.PropTypes.func.isRequired,
  playerPath: React.PropTypes.string,
  onPathChange: React.PropTypes.func.isRequired,
  path: React.PropTypes.string.isRequired
}

export default Settings
