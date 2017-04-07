import {} from './sizeControl.scss'
import React from 'react'
import {MEDIUM, LARGE, XLARGE} from '../../utils/consts.js'

const SizeControl = props => (
  <div className="font-size-control-container">
    <span className="title">Size:</span>
    <input type="radio"
           value={MEDIUM}
           checked={props.value === MEDIUM}
           onChange={props.onChange}
           name="SizeSettings"
           id={MEDIUM}/>
    <label htmlFor={MEDIUM}>M</label>
    <input type="radio"
           value={LARGE}
           checked={props.value === LARGE}
           onChange={props.onChange}
           name="SizeSettings"
           id={LARGE}/>
    <label htmlFor={LARGE}>L</label>
    <input type="radio"
           value={XLARGE}
           checked={props.value === XLARGE}
           onChange={props.onChange}
           name="SizeSettings"
           id={XLARGE}/>
    <label htmlFor={XLARGE}>XL</label>
  </div>
)

SizeControl.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.oneOf([MEDIUM, LARGE, XLARGE]).isRequired
}

export default SizeControl
