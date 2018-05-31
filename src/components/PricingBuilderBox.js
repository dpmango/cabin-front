import React, { Component } from 'react';
import { ADD_PRICING_OPTION, REMOVE_PRICING_OPTION } from '../store/ActionTypes';
import { connect } from 'react-redux';

import PricingBuilderOption from '../components/PricingBuilderOption';
import PricingBuilderBoxList from '../components/PricingBuilderBoxList';

class PricingBuilderBox extends Component {

  constructor(props){
    super(props);

    this.state = {
      isAddonActive: false
    }
  }

  toggleAddonActive = () => {
    this.setState({
      isAddonActive: !this.state.isAddonActive
    }, () => this.changePricingOptions() )
  }

  changePricingOptions = () => {

    const { name, price, pricingOptionsState } = this.props;

    if ( this.state.isAddonActive ){
      this.props.addPricingOption({
        name, price
      });
    } else {
      const idForRemoval = pricingOptionsState.map( x => x.name).indexOf(name);

      this.props.removePricingOption(idForRemoval);
    }

  }

  render(){

    const { name, price, pricePer, priceStartingFrom, helpText, pricingOptions, boxList, isAddon } = this.props;

    return(
      <div className={"p-builder-box " + (this.state.isAddonActive ? "is-choosen" : "")}>
        { isAddon &&
          <div className="p-builder-box__addon">
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
              { pricingOptions.map((option, i) => (
                <PricingBuilderOption
                  key={i}
                  name={option.name}
                  price={option.price}
                  pricePer={option.pricePer}
                />
              )) }

            </div>
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pricingOptionsState: state.pricing.pricingOptions,
});

const mapDispatchToProps = (dispatch) => ({
  addPricingOption: (data) => dispatch({ type: ADD_PRICING_OPTION, payload: data }),
  removePricingOption: (data) => dispatch({ type: REMOVE_PRICING_OPTION, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingBuilderBox);
