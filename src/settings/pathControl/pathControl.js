import {} from './pathControl.scss'
import React from 'react'
import {ENTER, ESC} from '../../utils/consts.js'
import {isDir} from '../../utils/utils.js'
const {dialog} = require('electron').remote

export default class PathControl extends React.Component {

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onAccept: React.PropTypes.func.isRequired
  }

  state = {
    tempValue: this.props.value,
    isValid: true
  }

  restorePath = () => {this.setState({tempValue: this.props.value})}

  handleKeyDown = ({keyCode}) => {
    if (keyCode === ENTER) {
      this.handleAccept()
    } else if (keyCode === ESC) {
      this.restorePath()
    }
  }

  handleAccept = () => {
    const tempValue = this.state.tempValue
    if (isDir(tempValue)) {
      this.props.onAccept(tempValue)
    } else {
      this.restorePath()
    }
  }

  handleChange = ({target: {value}}) => {
    this.setState({tempValue: value, isValid: isDir(value)})
  }

  handleClick = () => {
    const callback = ([value]) => {
      this.handleChange({target: {value}})
      this.handleAccept(value)
    }

    dialog.showOpenDialog({
      title: 'Please Select The TV Folder',
      buttonLabel: 'Select Folder',
      defaultPath: this.props.value,
      properties: ['openDirectory']
    }, callback)
  }

  render() {
    return (
      <div className='path-control-container'>
        <span className="title">Folder:</span>
        <input className={`input${this.state.isValid?'':' invalid'}`}
               type="text"
               value={this.state.tempValue}
               onChange={this.handleChange}
               onKeyDown={this.handleKeyDown}/>
        <span className="browse" onClick={this.handleClick}>browse</span>
      </div>
    )
  }
}
