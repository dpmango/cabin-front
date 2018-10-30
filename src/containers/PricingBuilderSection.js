import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { SET_PRICING_SECTION } from 'store/ActionTypes';
import { Tooltip } from 'react-tippy';

import ScrollTo from 'services/ScrollTo';
import SvgIcon from 'components/SvgIcon';
import PricingBuilderBox from 'containers/PricingBuilderBox';

class PricingBuilderSection extends Component {
  static propTypes = {
    headerStep: PropTypes.string,
    headerName: PropTypes.string,
    headerDesc: PropTypes.string,
    headerTooltipContent: PropTypes.string,
    boxes: PropTypes.array,
    sectionIndex: PropTypes.number,
    pricingBuilderSection: PropTypes.bool,
    // setPricingSection: PropTypes.func
  };

  constructor(){
    super();

    this.sectionRef = React.createRef();
  }

  scrollToSection = () => {
    ScrollTo(this.sectionRef.current.offsetTop, 1000)
  }

  render(){

    const { headerStep, headerName, headerDesc, headerTooltipContent, boxes, pricingBuilderSection, sectionIndex } = this.props;

    return(
      <div className={"p-builder" + ((sectionIndex === 1) || (pricingBuilderSection) ? " is-visible" : "") } ref={this.sectionRef} data-index={sectionIndex}>
        <div className="container container--narrow">
          <div className="p-builder__header">
            <div className="t-small">{headerStep}</div>
            <h2>{headerName}</h2>
            <div className="p-builder__header-desc">
              <p className="t-paragraph">{headerDesc}</p>
              { headerTooltipContent &&
                <Tooltip
                  title={headerTooltipContent}
                  position="top"
                  distance="10"
                  arrow="true">
                    <SvgIcon name="question-circle" />
                </Tooltip>
              }

            </div>
          </div>

          { boxes && boxes.map((box, i) => (
            <PricingBuilderBox
              key={i}
              isRequired={box.isRequired}
              id={box.id}
              pricingOptions={box.pricingOptions}
              boxList={box.boxList}
              rangeSlider={box.rangeSlider}
              name={box.name}
              price={box.price}
              pricePer={box.pricePer}
              priceStartingFrom={box.priceStartingFrom}
              helpText={box.helpText}
              isAddon={box.isAddon}
              isPopular={box.isPopular}
            />
          )) }

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pricingBuilderSection: state.pricing.firstSectionSelected,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PricingBuilderSection);
