import {} from './debounceControl.scss'
import React from 'react'

const DebounceControl = props => (
  <div className="debounce-control-container">
    <span className="title">Keyboard Delay (ms):</span>
    <input type="number"
           min="0"
           max="5000"
           value={props.value}
           onChange={props.onChange}/>
  </div>
)

DebounceControl.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
}

export default DebounceControl
