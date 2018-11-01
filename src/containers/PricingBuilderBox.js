import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ADD_PRICING_OPTION, REMOVE_PRICING_OPTION, ADD_PRICING_OPTION_SUB, REMOVE_PRICING_OPTION_SUB, REMOVE_ALL_PRICING_OPTIONS_SUB, SET_PRICING_SLIDER, SET_PRICING_SECTION } from 'store/ActionTypes';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import { Tooltip } from 'react-tippy';
import ScrollTo from 'services/ScrollTo';
import SvgIcon from 'components/SvgIcon';

import PricingSliderDb from 'store/PricingSliderDb'
import PricingBuilderOption from 'components/PricingBuilderOption';
import PricingBuilderBoxList from 'components/PricingBuilderBoxList';

class PricingBuilderBox extends Component {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    pricePer: PropTypes.string,
    priceStartingFrom: PropTypes.bool,
    // helpText: PropTypes.obj,
    pricingOptions: PropTypes.array,
    boxList: PropTypes.array,
    isAddon: PropTypes.bool,
    isPopular: PropTypes.bool,
    isQuoteRequired: PropTypes.bool,
    isRequired: PropTypes.bool,
    rangeSlider: PropTypes.bool,
    addPricingOption: PropTypes.func,
    removePricingOption: PropTypes.func,
    addPricingOptionSub: PropTypes.func,
    removePricingOptionSub: PropTypes.func,
    removeAllPricingOptionsSub: PropTypes.func,
    setPricingSlider: PropTypes.func,
    setPricingSection: PropTypes.func
  };

  constructor(props){
    super(props);

    this.pagename = window.location.pathname.split('/')[2];

    this.activeBoxInState = props.pricingOptionsState.some( x => (x.id === props.id) && (this.pagename === x.pagename))
    this.activeOptionIdInState = null;

    this.boxRef = React.createRef();
    this.optionsRef = React.createRef();

    if ( props.rangeSlider === true ){
      this.sliderValInState = props.pricingSliderState
    } else if ( props.pricingOptionsSubState && props.pricingOptionsSubState.length > 0 ){
      props.pricingOptionsSubState.forEach((option) => {
        if ( (option.boxId === props.id) && (this.pagename === option.pagename) ){
          // when matching the subOpt in state - check through options props
          props.pricingOptions.forEach( (x, index) => {
            if( (x.name === option.name) ){
              this.activeOptionIdInState = index
            }
          })
        }
      })
    }

    this.state = {
      pagename: this.pagename,
      isAddonActive: this.activeBoxInState,
      activeOptionId: this.activeOptionIdInState,
      sliderVal: this.sliderValInState,
      sliderValPrice: PricingSliderDb[this.sliderValInState - 1]
    }
  }

  // master function with routing
  changeOtions = (fromOption, optionObj) => {
    const { pricingOptions, rangeSlider } = this.props;

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
        this.changePricingBox();
        // scroll to options if any on activated
        if ( this.state.isAddonActive ) {
          if (rangeSlider || pricingOptions ){
            setTimeout(() => this.scrollToOptions(), 300) // timeout is for dom bindings (hidden block)
          } else {
            setTimeout(() => this.scrollToBoxBottom(), 300)
          }
        }
      })
    }

  }

  // box toggler (main option)
  changePricingBox = () => {

    const { name, price, id, isRequired, pricingOptionsState, rangeSlider } = this.props;
    const pagename = this.state.pagename;
    const positionInStateArray = pricingOptionsState.map( x => x.id ).filter( x => x.pagename !== pagename).indexOf(id);
    if ( this.state.isAddonActive ){
      // emulate click to add first SubOption
      // * if any and if not active present
      if ( !isRequired && this.optionChild && this.state.activeOptionId === null ){
        this.optionChild.computeClickHandler(true);
      }

      // enable slider also
      if ( rangeSlider && this.state.sliderVal === null ){
        this.rangeSliderChange(10);
        this.rangeSliderAfterChange(10)
      }

      const isAddedAlready = positionInStateArray !== -1

      if ( !isAddedAlready ){
        this.props.addPricingOption({
          pagename, id, name, price
        })
      }

    } else {
      this.props.removePricingOption(positionInStateArray);

      this.clearAllOptions();

      this.setState({
        activeOptionId: null,
        sliderVal: null,
        sliderValPrice: null
      }, () => {
        this.props.setPricingSlider(null)
      })

    }

  }

  // option toggler (sub option)
  changePricingOption = (name, price) => {

    this.clearAllOptions();

    const boxId = this.props.id;
    const pagename = this.state.pagename

    this.props.addPricingOptionSub({
      pagename, boxId, name, price
    })

  }

  clearAllOptions = () => {
    // this.props.removeAllPricingOptionsSub();

    const { id, pricingOptionsSubState } = this.props;
    const pagename = this.state.pagename;

    pricingOptionsSubState.forEach( (x, i) => {
      if ( (x.boxId === id) && (pagename === x.pagename) ){
        this.props.removePricingOptionSub(i)
      }
    })

  }

  pricingOptionClickHandler = (curIndex, curName, curPrice, isSynteticClick) => {
    // options calculated inside PricingBuilderOption
    if ( this.state.activeOptionId !== curIndex ){ // do nothing clicking active el
      this.changeOtions(true,{
        curIndex, curName, curPrice
      })

      if ( !isSynteticClick ){
        setTimeout(() => this.scrollToBoxBottom(), 300)
      }

      if ( this.props.isRequired ){
        // when isReguired (first section) is selected - always true
        // as we can't deselect required option
        this.props.setPricingSection(true)
      }
    }

  }

  scrollToBoxBottom = () => {
    const docElement = document.scrollingElement || document.documentElement
    const boxRefPos = this.boxRef.current.getBoundingClientRect()
    const bottomFromBox = boxRefPos.top + boxRefPos.height + docElement.scrollTop - 80
    ScrollTo(bottomFromBox, 500)
  }

  scrollToOptions = () => {
    const docElement = document.scrollingElement || document.documentElement
    // const optionsRefPos = this.optionsRef.current.getBoundingClientRect()
    // const optionsTop = optionsRefPos.top + docElement.scrollTop - 80

    // scroll to the start of box instead of option
    const boxRefPos = this.boxRef.current.getBoundingClientRect()
    const bottomFromBox = boxRefPos.top + docElement.scrollTop - 95

    ScrollTo(bottomFromBox, 500)
  }

  // Slider functions
  rangeSliderChange = (val) => {
    // 10 is a minumum
    val = val <= 10 ? 10 : val
    this.setState({
      sliderVal: val,
      sliderValPrice: PricingSliderDb[val - 1]
    }, () => {
      this.props.setPricingSlider(val)
    })
  };

  rangeSliderAfterChange = (val) => {
    const curIndex = 0;
    const curName = val + ' employees';
    const curPrice = 'S$' + PricingSliderDb[val - 1]

    this.changeOtions(true,{
      curIndex, curName, curPrice
    })

  }


  render(){

    const { name, price, pricePer, priceStartingFrom, helpText, pricingOptions, boxList, isAddon, isPopular, isRequired, rangeSlider } = this.props;
    const { activeOptionId, sliderVal, sliderValPrice, pagename } = this.state;

    return(
      <div data-pagename={pagename} className={"p-builder-box " + (this.state.isAddonActive ? "is-choosen" : "")} ref={this.boxRef}>
        { isAddon &&
          <div className="p-builder-box__addon" onClick={this.changeOtions}>
            + ADD-ON
          </div>
        }
        <div className="p-builder-box__wrapper">
          { isPopular &&
            <div className="p-builder-box__tag">Most Popular</div>
          }
          <div className="p-builder-box__head">
            { isAddon &&
              <div className="p-builder-box__toggle" onClick={this.changeOtions}></div>
            }
            <div className="p-builder-box__name">{name}</div>
            { /*isAddon &&
              <div className="p-builder-box__head-icon">
                <i className="icon icon-optionBox" />
              </div>
            */ }
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

          {/* { helpText &&
            <div className="p-builder-box__help-text">
              {helpText.name}
              <Tooltip
                title={helpText.tooltip}
                position="top"
                distance="10"
                arrow="true">
                  <SvgIcon name="question-circle" />
              </Tooltip>
            </div>
          } */}
        </div>

        { pricingOptions &&
          <div className={ "p-builder-box__options "
            + (isRequired ? "always-visible " : "" )
            + (isRequired && activeOptionId === null ? "is-required " : "")
            + (activeOptionId !== null ? "have-selected " : "")
          } ref={this.optionsRef} >
            { helpText &&
              <div className="p-builder-box__help-text">
                {helpText.name}
                <Tooltip
                  title={helpText.tooltip}
                  position="top"
                  distance="10"
                  arrow="true">
                    <SvgIcon name="question-circle" />
                </Tooltip>
              </div>
            }
            <div className="p-builder-box__options-list" data-number-of-elements={pricingOptions.length}>
              { pricingOptions.map((option, i) => {

                let isActiveOption = activeOptionId === i

                return(
                  <PricingBuilderOption
                    key={i}
                    index={i}
                    name={option.name}
                    price={option.price}
                    pricePer={option.pricePer}
                    isActiveOption={isActiveOption}
                    onRef={ i === 0 ? ref => (this.optionChild = ref) : undefined }
                    clickHandler={this.pricingOptionClickHandler}
                  />
                )

              }) }

            </div>
          </div>
        }

        { rangeSlider &&
          <div className={"p-builder-box__options "
            + (activeOptionId !== null ? "have-selected " : "")
            } ref={this.optionsRef}>
            <div className="p-builder-box-slider">
              <Slider
                defaultValue={0}
                value={sliderVal}
                min={0}
                max={50}
                onChange={this.rangeSliderChange}
                onAfterChange={this.rangeSliderAfterChange}
              />

              <div className={"p-builder-box-slider__val " + (sliderVal ? "is-visible" : "")}>{sliderVal <= 10 ? 10 : sliderVal } employees</div>

              <div className={"p-builder-box-slider__price " + (sliderVal ? "is-visible" : "")}>
                <div className="p-builder-box-slider__price-box">
                  <span>+S${sliderValPrice}</span>
                  <span>per month</span>
                </div>
              </div>

            </div>
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pricingOptionsState: state.pricing.pricingOptions,
  pricingSliderState: state.pricing.slider,
  pricingOptionsSubState: state.pricing.pricingOptionsSub,
});

const mapDispatchToProps = (dispatch) => ({
  addPricingOption: (data) => dispatch({ type: ADD_PRICING_OPTION, payload: data }),
  removePricingOption: (data) => dispatch({ type: REMOVE_PRICING_OPTION, payload: data }),
  addPricingOptionSub: (data) => dispatch({ type: ADD_PRICING_OPTION_SUB, payload: data }),
  removePricingOptionSub: (data) => dispatch({ type: REMOVE_PRICING_OPTION_SUB, payload: data }),
  removeAllPricingOptionsSub: (data) => dispatch({ type: REMOVE_ALL_PRICING_OPTIONS_SUB }),
  setPricingSlider: (data) => dispatch({ type: SET_PRICING_SLIDER, payload: data }),
  setPricingSection: (data) => dispatch({ type: SET_PRICING_SECTION, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingBuilderBox);
