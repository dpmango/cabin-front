import React from 'react';

const Image = (props) => {
  const { file, alt } = props;
  const imgExt = file.split('.').pop()
  const imgName = file.slice(0, file.length - imgExt.length - 1)

  return (
    <React.Fragment>
      <img src={require(`../images/${imgName}.${imgExt}`)} srcSet={require(`../images/${imgName}@2x.${imgExt}`)  + ' 2x'} alt={alt ? alt : ""}/>
    </React.Fragment>
  )
}

export default Image
