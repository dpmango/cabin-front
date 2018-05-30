import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'

export default class FormInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeHandler: PropTypes.func,
    mask: PropTypes.array
  };

  constructor(props) {
    super();

    this.state = {

    }
  }

  render(){
    const { name, placeholder, value, onChangeHandler, mask } = this.props
    const {  } = this.state

    if ( mask ){
      return (
        <div className="ui-group">
          <MaskedInput
            type="text"
            mask={mask}
            guide={false}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}
          />
        </div>
      )
    } else {
      return(
        <div className="ui-group">
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}
          />
        </div>
      )
    }

  }
}
