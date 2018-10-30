import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';
// import { Scrollbars } from 'react-custom-scrollbars';
// import ScrollArea from 'react-scrollbar';
import PerfectScrollbar from 'react-perfect-scrollbar'
import SvgIcon from 'components/SvgIcon';
import CheckBox from 'components/CheckBox';
// import cloneDeep from 'lodash/cloneDeep';

class ShareholderTable extends Component {

  constructor(props){
    super(props);

    this.state = {
      inputs_values: [
        props.schema.tbody.map( x => {
          return {type: x.type, placeholder: x.placeholder, name: x.name, value: x.value ? x.value : "" }
        }),
        props.schema.tbody.map( x => {
          return {type: x.type, placeholder: x.placeholder, name: x.name, value: x.value ? x.value : "" }
        })
      ]
    }

    this._scrollBarRefTable = React.createRef();

  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  // input functiuons

  handleChange = (e, rowIndex, type, placeholder) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;

    let cellIndex = -1
    this.state.inputs_values[rowIndex].forEach( (x,i) => {
      if ( x.name === fieldName ){
        cellIndex = i
      }
    })

    const newObj = {
      type: type,
      placeholder: placeholder,
      name: fieldName,
      value: fieldVal,
    }

    const stateClone = this.state.inputs_values; // cloneDeep ?
    stateClone[rowIndex][cellIndex] = newObj

    this.setState({...this.state,
      inputs_values: stateClone
    });

  }

  // checkbox options
  chooseOption = (name, rowIndex, type, placeholder) => {

    let cellIndex = -1
    this.state.inputs_values[rowIndex].forEach( (x,i) => {
      if ( x.name === name ){
        cellIndex = i
      }
    })

    const stateValue = this.state.inputs_values[rowIndex][cellIndex].value

    const newObj = {
      type: type,
      placeholder: placeholder,
      name: name,
      value: stateValue === "" ? true : !stateValue // first click
    }

    const stateClone = this.state.inputs_values
    stateClone[rowIndex][cellIndex] = newObj

    this.setState({...this.state,
      inputs_values: stateClone
    }, () => {
      // pass state to parent
      this.props.updateState(this.state.inputs_values)
    })

  }

  // new line
  addNewLine = () => {
    const stateClone = this.state.inputs_values;
    stateClone.push(
      this.props.schema.tbody.map( x => {
        return {type: x.type, placeholder: x.placeholder, name: x.name, value: x.value ? x.value : "" }
      })
    )

    this.setState({...this.state,
      inputs_values: stateClone
    })
  }

  updateState = () => {
    // as it's a significat delay between onChange and Onblur, this call is
    // state update agnostic
    this.props.updateState(this.state.inputs_values)
  }


  renderInputComponenet = (schema, rowIndex, cellIndex) => {
    const {inputs_values} = this.state

    switch (schema.type) {
      case 'input':
        return(
          <input
            type="text"
            name={schema.name}
            placeholder={schema.placeholder}
            value={inputs_values[rowIndex][cellIndex].value}
            onBlur={this.updateState}
            onChange={(e) => this.handleChange(e, rowIndex, schema.type, schema.placeholder)}
          />
        )
      case 'checkbox':
        return(
          <CheckBox
            name={schema.name + `_${rowIndex}`}
            text={null}
            clickHandler={this.chooseOption.bind(this, schema.name, rowIndex, schema.type, schema.placeholder)}
            isActive={inputs_values[rowIndex][cellIndex].value}
          />
        )
      default:
        return false
    }

  }

  // scrollbar functions
  updateScrollbar = () => {
    this._scrollBarRef.updateScroll()
  }

  render(){

    const {
      props: {schema, title, titleTooltip, helperText, addMoreText },
      state: { inputs_values }
    } = this

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
        <PerfectScrollbar
          ref={(ref) => { this._scrollBarRef = ref; }}
          className="sh-table__wrapper" >
        {/* <div className="sh-table__wrapper"> */}
          <table>
            <thead>
              {
                schema.topRow &&
                <tr class="sh-table__top">
                  {schema.topRow.map( (td, i) => {
                    return(
                      <td
                        colspan={td.colspan ? td.colspan : null}
                        key={i}>
                        { td.icon &&
                          <SvgIcon name={td.icon} />
                        }
                        <span>
                          { td.name }
                          { td.tooltip &&
                            <Tooltip
                              title={td.tooltip}
                              position="top"
                              distance="10"
                              arrow="true">
                                <SvgIcon name="question-circle" />
                            </Tooltip>
                          }
                        </span>
                      </td>
                    )
                  })}
                </tr>
              }
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
                          <td key={index}>{this.renderInputComponenet(td, i, index)}</td>
                        )
                      })}
                    </tr>
                  )
                }
              )}

            </tbody>
          </table>
          <div
            className="sh-table__add"
            onClick={this.addNewLine}>+ {addMoreText}</div>
          { helperText &&
            <div className="sh-table__info">{helperText}</div>
          }
        </PerfectScrollbar>
      </div>
    )
  }
}

export default ShareholderTable
