import {} from './fileLink.scss'
import React from 'react'
import {HOME, MEDIUM, LARGE, XLARGE} from '../utils/consts.js'

const FileLink = props => {
  const isHome = props.name===HOME ? ' home' : ''
  const isSelected = props.isSelected ? ' selected' : ''
  const isFolder = props.isFolder ? ' folder' : ''
  const inlineStyle = props.fontSize ? {'font-size': `${ props.fontSize}em`} : {}

  return (
    <div style={inlineStyle}
         className={`file-link-container ${props.size + isHome + isSelected + isFolder}`}>
      <div className='name'>
        {props.name}
      </div>
    </div>
  )
}

FileLink.propTypes = {
  name: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  isFolder: React.PropTypes.bool.isRequired,
  size: React.PropTypes.oneOf([MEDIUM, LARGE, XLARGE]).isRequired,
  fontSize: React.PropTypes.string
}

export default FileLink
