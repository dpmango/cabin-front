import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';
import { Scrollbars } from 'react-custom-scrollbars';

import SvgIcon from '../components/SvgIcon';
import CheckBox from '../components/CheckBox';

class ShareholderTable extends Component {

  constructor(props){
    super(props);

    this.schemaInputs = props.schema.tbody.map( x => {
      return {type: x.type, placeholder: x.placeholder, name: x.name, value: ''}
    })

    this.state = {
      inputs_values: [
        this.schemaInputs,
        this.schemaInputs
      ]
    }
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;

    let index = -1
    this.state.inputs_values.forEach( (x,i) => {
      if ( x.name === fieldName ){
        index = i
      }
    })

    const newObj = { name: fieldName, value: fieldVal }
    const stateClone = this.state.inputs_values
    stateClone[index] = newObj

    this.setState({...this.state,
      inputs_values: stateClone
    });

  }

  chooseOption = (id, name) => {
    const options = this.state[name]
    let index

    if (options.indexOf(id) === -1) {
     options.push(id)
    } else {
     index = options.indexOf(id)
     options.splice(index, 1)
    }

    this.setState({
      ...this.state,
      [name]: options
    })
  }

  addNewLine = () => {

    const stateClone = this.state;
    stateClone.inputs_values.push(this.schemaInputs)

    this.setState({
      stateClone
    });
  }

  renderInputComponenet = (schema) => {
    const {inputs_values} = this.state

    switch (schema.type) {
      case 'input':
        return(
          <input
            type="text"
            name={schema.name}
            placeholder={schema.placeholder}
            value={inputs_values[schema.name]}
            onChange={this.handleChange}
          />
        )
      case 'checkbox':
        return(
          <CheckBox
            name={schema.name}
            text={null}
            clickHandler={this.chooseOption.bind(this, schema.name)}
            isActive={inputs_values[schema.name]}
          />
        )
      default:
        return false
    }

  }

  render(){

    const { schema, title, titleTooltip, helperText } = this.props;
    const { inputs_values } = this.state

    return(
      <div className="sh-table">
        <div className="sh-table__title">
          {title}
          {titleTooltip &&
            <Tooltip
              title={titleTooltip}
              position="top"
              distance="10"
              arrow="true">
                <SvgIcon name="question-circle" />
            </Tooltip>
          }
        </div>
        <div className="sh-table__wrapper">
        <Scrollbars
          // onScroll={(e) => console.log(e)}
          autoHeight
           >
          <table>
            <thead>
              <tr>
                {schema.thead.map( (td, i) => {
                  return(
                    <td key={i}>
                      { td.icon &&
                        <SvgIcon name={td.icon} />
                      }
                      <span>{ td.name }</span>
                    </td>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {inputs_values.map((tr,i) => {
                  return(
                    <tr key={i}>
                      {tr.map( (td,index) => {
                        return(
                          <td key={index}>{this.renderInputComponenet(td)}</td>
                        )
                      })}
                    </tr>
                  )
                }
              )}

            </tbody>
          </table>
          <div className="sh-table__add" onClick={this.addNewLine}>+ Add Additional Individuals</div>
          { helperText &&
            <div className="sh-table__info">{helperText}</div>
          }
        </Scrollbars>
        </div>
      </div>
    )
  }
}

export default ShareholderTable
