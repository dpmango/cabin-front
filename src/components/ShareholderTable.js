import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';
import SvgIcon from '../components/SvgIcon';
import CheckBox from '../components/CheckBox';

class ShareholderTable extends Component {

  constructor(props){
    super(props);

    this.initialInputNames = props.schema.tbody.map( x => {
      return {name: x.name, value: ''}
    })

    this.state = {
      inputs_values: this.initialInputNames // TODO refactor to indexes with one lvl up
    }
  }

  componentDidUpdate(){
    // console.log(this.state)
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
              <tr>
                {schema.tbody.map( (td, i) => {
                  return(
                    <td key={i}>
                      {this.renderInputComponenet(td)}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
          { helperText &&
            <div className="sh-table__info">{helperText}</div>
          }
        </div>
      </div>
    )
  }
}

export default ShareholderTable
