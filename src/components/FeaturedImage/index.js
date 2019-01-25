import React from 'react';
import Img from 'gatsby-image';

import ImageWrapper from './ImageWrapper';

function FeaturedImage({ sizes }) {
  return (
    <ImageWrapper>
      <Img sizes={sizes} alt="" />
    </ImageWrapper>
  );
}

export default FeaturedImage;
