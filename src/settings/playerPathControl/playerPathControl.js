import {} from './playerPathControl.scss'
import React from 'react'
const {dialog} = require('electron').remote

const PlayerPathControl = props => {
  const handleClick = () => {
    dialog.showOpenDialog({
      title: 'Please Select The Video Player\'s Executable file',
      buttonLabel: 'Select File',
      defaultPath: props.value,
      properties: ['openFile']
    }, ([value]) => props.onChange(value))
  }

  return (
    <div className="player-path-control-container">
      <span className={`browse ${props.value?'':'empty'}`}
            onClick={handleClick}>{`${props.value?'Change':'Select a'} Video Player`}</span>
    </div>
  )
}

PlayerPathControl.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
}

export default PlayerPathControl