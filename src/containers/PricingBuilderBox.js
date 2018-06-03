import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ADD_PRICING_OPTION, REMOVE_PRICING_OPTION, ADD_PRICING_OPTION_SUB, REMOVE_PRICING_OPTION_SUB } from '../store/ActionTypes';
import { connect } from 'react-redux';

import PricingBuilderOption from '../components/PricingBuilderOption';
import PricingBuilderBoxList from '../components/PricingBuilderBoxList';

class PricingBuilderBox extends Component {

  static propTypes = {
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
  };

  constructor(props){
    super(props);

    this.activeBoxInState = props.pricingOptionsState.map( x => x.name).indexOf(props.name);
    this.activeOptionIdInState = null;

    // if ( props.pricingOptions && props.pricingOptions.length > 0 ){
    //   props.pricingOptions.forEach((option) => {
    //     let foundId = props.pricingOptionsSubState.map( x => x.name).indexOf(option.name);
    //
    //     // search within scope of the current box
    //     console.log( this.activeBoxInState , option.parentId )
    //     if ( foundId !== -1 && this.activeBoxInState === option.parentId ){
    //       this.activeOptionIdInState = foundId
    //       console.log('found option in state', foundId)
    //     }
    //   })
    // }

    this.state = {
      isAddonActive: this.activeBoxInState !== -1 ? true : false,
      activeBoxId: this.activeBoxInState,
      activeOptionId: this.activeOptionIdInState
    }
  }

  toggleAddonActive = (fromOption, optionObj) => {

    // when option is selected - box is always active
    if ( fromOption === true ){
      this.setState({
        isAddonActive: true,
        activeBoxId: this.props.pricingOptionsState.length - 1, // how to check if from active or unactive box
        activeOptionId: optionObj.curIndex
      }, () => {
        this.changePricingOptions(true)
        this.changePricingOptionsSub(optionObj.curName, optionObj.curPrice)
      } )

    } else {
      this.setState({
        isAddonActive: !this.state.isAddonActive,
        activeBoxId: this.props.pricingOptionsState.length - 1,
      }, () => this.changePricingOptions() )
    }
  }

  changePricingOptions = (fromOption) => {

    const { name, price } = this.props;

    if ( this.state.isAddonActive ){
      this.props.addPricingOption({
        name, price
      });
    } else {

      this.props.removePricingOption(this.state.activeBoxId);
    }

  }

  changePricingOptionsSub = (name, price) => {

    const parentId = this.state.activeBoxId;

    this.props.addPricingOptionSub({
      parentId, name, price
    })

    // +++
    // removal logic

    // this.props.removePricingOptionSub({
    //   parentId
    // })

  }

  pricingOptionClickHandler = (e) => {
    let curTarget = e.currentTarget
    let curIndex = Number(curTarget.getAttribute('data-index'));
    let curName = curTarget.getAttribute('data-name');
    let curPrice = curTarget.getAttribute('data-price');

    if ( this.state.activeOptionId !== curIndex ){ // invalid validation ?
      // selected not the same element
      // if the same - do nothing
      this.toggleAddonActive(true,{
        curIndex, curName, curPrice
      })
    }

  }

  render(){

    const { name, price, pricePer, priceStartingFrom, helpText, pricingOptions, boxList, isAddon } = this.props;

    return(
      <div className={"p-builder-box " + (this.state.isAddonActive ? "is-choosen" : "")}>
        { isAddon &&
          <div className="p-builder-box__addon" onClick={this.toggleAddonActive}>
            + ADD-ON
          </div>
        }
        <div className="p-builder-box__wrapper">
          <div className="p-builder-box__head">
            { isAddon &&
              <div className="p-builder-box__toggle" onClick={this.toggleAddonActive}></div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingBuilderBox);
