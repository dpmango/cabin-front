import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';
// import { Scrollbars } from 'react-custom-scrollbars';
// import ScrollArea from 'react-scrollbar';
import PerfectScrollbar from 'react-perfect-scrollbar'
import SvgIcon from 'components/SvgIcon';
import CheckBox from 'components/CheckBox';
// import cloneDeep from 'lodash/cloneDeep';

class ShareholderTable extends Component {
  constructor(){
    super();
    this._scrollBarRefTable = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  renderInputComponent = (schema, rowIndex, cellIndex) => {
    const {data} = this.props

    switch (schema.type) {
      case 'input':
        return(
          <input
            className={data[rowIndex][cellIndex].error ? "has-error" : ""}
            type="text"
            name={schema.name}
            placeholder={schema.placeholder}
            value={data[rowIndex][cellIndex].value}
            onChange={(e) => this.props.onInputChangeHandler(e, rowIndex, schema.type, schema.placeholder)}
          />
        )
      case 'checkbox':
        return(
          <CheckBox
            name={schema.name + `_${rowIndex}`}
            text={null}
            clickHandler={this.props.onCheckboxChangeHandler.bind(this, schema.name, rowIndex, schema.type, schema.placeholder)}
            isActive={data[rowIndex][cellIndex].value}
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
      props: {schema, data, title, titleTooltip, helperText, addMoreText }
    } = this

    // first render might be be blank
    if ( !data ) return null

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
                <tr className="sh-table__top">
                  {schema.topRow.map( (td, i) => {
                    return(
                      <td
                        colSpan={td.colspan ? td.colspan : null}
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
                      { td.icon && <SvgIcon name={td.icon} /> }
                      <span>{ td.name }</span>
                    </td>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((tr,i) => {
                  return(
                    <tr key={i}>
                      {tr.map( (td,index) => {
                        return(
                          <td key={index}>{this.renderInputComponent(td, i, index)}</td>
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
            onClick={this.props.onAddNewLine}>+ {addMoreText}</div>
          { helperText &&
            <div className="sh-table__info">{helperText}</div>
          }
        </PerfectScrollbar>
      </div>
    )
  }
}

export default ShareholderTable
