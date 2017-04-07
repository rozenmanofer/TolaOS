import {} from './fontSizeControl.scss'
import React from 'react'

const FontSizeControl = props => (
  <div className="font-size-override-control-container">
    <span className="title">Font Size:</span>
    <input type="string"
           placeholder="auto"
           value={props.value}
           onChange={props.onChange}/>
  </div>
)

FontSizeControl.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
}

export default FontSizeControl
