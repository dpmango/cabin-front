import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ADD_PRICING_OPTION, REMOVE_PRICING_OPTION, ADD_PRICING_OPTION_SUB, REMOVE_PRICING_OPTION_SUB, REMOVE_ALL_PRICING_OPTIONS_SUB } from '../store/ActionTypes';
import { connect } from 'react-redux';

import PricingBuilderOption from '../components/PricingBuilderOption';
import PricingBuilderBoxList from '../components/PricingBuilderBoxList';

class PricingBuilderBox extends Component {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    pricePer: PropTypes.string,
    priceStartingFrom: PropTypes.bool,
    helpText: PropTypes.string,
    pricingOptions: PropTypes.array,
    boxList: PropTypes.array,
    isAddon: PropTypes.bool,
    addPricingOption: PropTypes.func,
    removePricingOption: PropTypes.func,
    addPricingOptionSub: PropTypes.func,
    removePricingOptionSub: PropTypes.func,
    removeAllPricingOptionsSub: PropTypes.func
  };

  constructor(props){
    super(props);

    this.activeBoxInState = props.pricingOptionsState.some( x => x.id === props.id)
    this.activeOptionIdInState = null;

    if ( props.pricingOptionsSubState && props.pricingOptionsSubState.length > 0 ){
      props.pricingOptionsSubState.forEach((option) => {
        if ( option.boxId == props.id ){
          props.pricingOptions.forEach( (x, index) => {
            if( x.name === option.name ){
              this.activeOptionIdInState = index
            }
          })
        }
      })
    }

    this.state = {
      isAddonActive: this.activeBoxInState,
      activeOptionId: this.activeOptionIdInState
    }
  }

  changeOtions = (fromOption, optionObj) => {
    if ( fromOption === true ){
      this.setState({isAddonActive: true}, () => {
        this.changePricingBox()

        this.setState({
          activeOptionId: optionObj.curIndex
        }, () => {
          this.changePricingOption(optionObj.curName, optionObj.curPrice)
        })

      })
    } else {
      this.setState({isAddonActive: !this.state.isAddonActive}, () => {
        this.changePricingBox()
      })
    }

  }

  changePricingBox = () => {

    const { name, price, id, pricingOptionsState } = this.props;
    const positionInStateArray = pricingOptionsState.map( x => x.id ).indexOf(id);

    if ( this.state.isAddonActive ){

      const isAddedAlready = positionInStateArray !== -1

      if ( !isAddedAlready ){
        this.props.addPricingOption({
          id, name, price
        })
      }

    } else {
      this.props.removePricingOption(positionInStateArray);

      this.clearAllOptions();

      this.setState({
        activeOptionId: null 
      })
    }

  }

  changePricingOption = (name, price) => {

    this.clearAllOptions();

    const boxId = this.props.id;

    this.props.addPricingOptionSub({
      boxId, name, price
    })

  }

  clearAllOptions = () => {
    // this.props.removeAllPricingOptionsSub();

    const { id, pricingOptionsSubState } = this.props;

    pricingOptionsSubState.forEach( (x, i) => {
      if ( x.boxId === id ){
        this.props.removePricingOptionSub(i)
      }
    })

  }

  pricingOptionClickHandler = (e) => {
    let curTarget = e.currentTarget
    let curIndex = Number(curTarget.getAttribute('data-index'));
    let curName = curTarget.getAttribute('data-name');
    let curPrice = curTarget.getAttribute('data-price');

    if ( this.state.activeOptionId !== curIndex ){ // do nothing clicking active el
      this.changeOtions(true,{
        curIndex, curName, curPrice
      })
    }

  }

  render(){

    const { name, price, pricePer, priceStartingFrom, helpText, pricingOptions, boxList, isAddon } = this.props;

    return(
      <div className={"p-builder-box " + (this.state.isAddonActive ? "is-choosen" : "")}>
        { isAddon &&
          <div className="p-builder-box__addon" onClick={this.changeOtions}>
            + ADD-ON
          </div>
        }
        <div className="p-builder-box__wrapper">
          <div className="p-builder-box__head">
            { isAddon &&
              <div className="p-builder-box__toggle" onClick={this.changeOtions}></div>
            }
            <div className="p-builder-box__name">{name}</div>
            { isAddon &&
              <div className="p-builder-box__head-icon">
                <i className="icon icon-optionBox" />
              </div>
            }
            <div className="p-builder-box__price">
              { priceStartingFrom &&
                <span className="p-builder-box__price-top">starting at</span>
              }
              <span className="p-builder-box__price-core">{price}</span>
              <span className="p-builder-box__price-for">{pricePer}</span>
            </div>
          </div>

          { boxList &&
            <PricingBuilderBoxList
              list={boxList}
            />
          }

          { helpText &&
            <div className="p-builder-box__help-text">{helpText}</div>
          }
        </div>

        { pricingOptions &&
          <div className="p-builder-box__options">
            <div className="p-builder-box__options-list" data-number-of-elements={pricingOptions.length}>
              { pricingOptions.map((option, i) => {

                let isActiveOption = this.state.activeOptionId === i

                return(
                  <PricingBuilderOption
                    key={i}
                    index={i}
                    name={option.name}
                    price={option.price}
                    pricePer={option.pricePer}
                    isActiveOption={isActiveOption}
                    clickHandler={this.pricingOptionClickHandler}
                  />
                )

              }) }

            </div>
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pricingOptionsState: state.pricing.pricingOptions,
  pricingOptionsSubState: state.pricing.pricingOptionsSub,
});

const mapDispatchToProps = (dispatch) => ({
  addPricingOption: (data) => dispatch({ type: ADD_PRICING_OPTION, payload: data }),
  removePricingOption: (data) => dispatch({ type: REMOVE_PRICING_OPTION, payload: data }),
  addPricingOptionSub: (data) => dispatch({ type: ADD_PRICING_OPTION_SUB, payload: data }),
  removePricingOptionSub: (data) => dispatch({ type: REMOVE_PRICING_OPTION_SUB, payload: data }),
  removeAllPricingOptionsSub: (data) => dispatch({ type: REMOVE_ALL_PRICING_OPTIONS_SUB }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingBuilderBox);
