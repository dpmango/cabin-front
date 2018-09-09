import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'
import { withFormsy } from 'formsy-react';
import SvgIcon from '../components/SvgIcon';
import { Tooltip } from 'react-tippy';

class FormInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeHandler: PropTypes.func,
    mask: PropTypes.array
  };

  constructor(props){
    super()

    this.textareaRef = React.createRef()
  }

  changeValue = (event) => {
    this.props.onChangeHandler(event)
    this.props.setValue(event.currentTarget.value);
  }

  render(){
    const { name, id, placeholder, mask, label, rows, tooltipContent, extraClass } = this.props

    const type = this.props.type ? this.props.type : "text"

    // An error message is returned only if the component is invalid
    const baseClass = 'ui-group ' + ( extraClass ? extraClass : "" )
    const errorMessage = this.props.isFormSubmitted() ? this.props.getErrorMessage() : null;
    const parentClass = this.props.isFormSubmitted() ? this.props.isValid() ? baseClass : 'ui-group has-error' : baseClass

    if ( mask ){
      return (
        <div className={parentClass}>
          <MaskedInput
            type={type}
            mask={mask}
            guide={false}
            name={name}
            placeholder={placeholder}
            onChange={this.changeValue}
            onKeyPress={this.props.onKeyHandler}
            value={this.props.getValue() || ''}
          />
          <span className="ui-input-validation">{errorMessage}</span>
        </div>
      )
    } else {
      return(
        <div className={parentClass}>
          {label &&
            <label className="ui-group__label" htmlFor={name}>{label}</label>
          }
          { type !== "textarea" &&
            <input
              type={type}
              name={name}
              id={id}
              placeholder={placeholder}
              onChange={this.changeValue}
              onKeyPress={this.props.onKeyHandler}
              value={this.props.getValue() || ''}
              // required={isRequired ? true : false}
            />
          }
          { type === "textarea" &&
            <textarea
              type={type}
              rows={rows}
              ref={this.textareaRef}
              name={name}
              placeholder={placeholder}
              onChange={this.changeValue}
              onKeyPress={this.props.onKeyHandler}
              value={this.props.getValue() || ''}
              // required={isRequired ? true : false}
            />
          }
          { tooltipContent &&
            <div className="ui-group__tooltip">
              <Tooltip
                title={tooltipContent}
                position="bottom"
                distance="10"
                arrow="true">
                  <SvgIcon name="question-circle" />
              </Tooltip>
            </div>
          }
          <span className="ui-input-validation">{errorMessage}</span>
        </div>
      )
    }

  }
}

export default withFormsy(FormInput);
