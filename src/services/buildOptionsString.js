const buildOptionsString = (pricingOptions, pricingOptionsSub) => {
  
  // const { pricingOptions, pricingOptionsSub } = this.props;
  const pricingOptionsPresent = pricingOptions && pricingOptions.length > 0
  const pricingOptionsSubPresent = pricingOptionsSub && pricingOptionsSub.length > 0
  let str = "";
  let totalPrice = 0;

  const parsePrice = (str) => {
    return Number((str).match(/\d+$/))
  }

  // watch if box without options present
  if ( pricingOptionsPresent ){
    pricingOptions.sort( (a,b) => a.id > b.id ).forEach( (option, i) => {
      let index = i + 1

      if ( pricingOptionsSubPresent ){
        const connectedSubOption = pricingOptionsSub.filter( x => x.boxId === option.id );

        if ( connectedSubOption && connectedSubOption.length > 0 ){
          // build str with option
          const subOpt = connectedSubOption[0];
          str += index + '. ' + option.name + ' (' + subOpt.name + ') (' + subOpt.price + '), '
          totalPrice += parsePrice(subOpt.price)
        } else {
          // no option
          str += index + '. ' + option.name + ' (' + option.price + ') , '
          totalPrice += parsePrice(option.price)
        }
      } else {
        str += index + '. ' + option.name + ' (' + option.price + ') , '
        totalPrice += parsePrice(option.price)
      }
    })

    str += ' || Total price: S$' + totalPrice
  }

  return str

}

export default buildOptionsString
