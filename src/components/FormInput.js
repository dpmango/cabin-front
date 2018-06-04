import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'
import { withFormsy } from 'formsy-react';

class FormInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeHandler: PropTypes.func,
    mask: PropTypes.array
  };

  changeValue = (event) => {
    this.props.onChangeHandler(event)
    this.props.setValue(event.currentTarget.value);
  }

  render(){
    const { name, placeholder, mask } = this.props

    // An error message is returned only if the component is invalid
    const errorMessage = this.props.isFormSubmitted() ? this.props.getErrorMessage() : null;
    const parentClass = this.props.isFormSubmitted() ? this.props.isValid() ? 'ui-group' : 'ui-group has-error' : 'ui-group'

    if ( mask ){
      return (
        <div className={parentClass}>
          <MaskedInput
            type="text"
            mask={mask}
            guide={false}
            name={name}
            placeholder={placeholder}
            onChange={this.changeValue}
            value={this.props.getValue() || ''}
          />
          <span className="ui-input-validation">{errorMessage}</span>
        </div>
      )
    } else {
      return(
        <div className={parentClass}>
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={this.changeValue}
            value={this.props.getValue() || ''}
            // required={isRequired ? true : false}
          />
          <span className="ui-input-validation">{errorMessage}</span>
        </div>
      )
    }

  }
}

export default withFormsy(FormInput);
