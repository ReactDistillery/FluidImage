import * as React from 'react';
import { storiesOf } from '@storybook/react';

import LazyFluidImage, { FluidImage } from '../src';
import Placeholder from '../src/Placeholder';
import ThumbnailImage from '../src/ThumbnailImage';
import Image from '../src/Image';

storiesOf('LazyFluidImage', module)
  .add('Placeholder using crop', () => (
    <Placeholder
      backgroundColor="red"
      crop={[0, 0, 100, 100]}
    />
  ))
  .add('Placeholder using fill', () => (
    <div style={{ height: '400px', width: '500px' }}>
      <Placeholder
        backgroundColor="red"
        crop={[0, 0, 100, 100]}
        fillContainer
      />
    </div>
  ))
  .add('ThumbnailImage', () => (
    <ThumbnailImage
      src="//onefinestay.imgix.net/media-library/2017-04-13-16-10-47-541239-LON_PAR631_Parke_Road.jpg"
      onLoad={() => { }}
      hasImageLoaded
    />
  ))
  .add('Image', () => (
    <Image
      src="//onefinestay.imgix.net/media-library/2017-04-13-16-10-47-541239-LON_PAR631_Parke_Road.jpg"
      onLoad={() => { }}
      hasImageLoaded
    />
  ))
  .add('LazyFluidImage', () => (
    <LazyFluidImage
      src="//onefinestay.imgix.net/media-library/2017-04-13-16-10-47-541239-LON_PAR631_Parke_Road.jpg"
      crop={[0, 333, 5760, 2880]}
    />
  ))
  .add('FluidImage', () => (
    <FluidImage
      src="//onefinestay.imgix.net/media-library/2017-04-13-16-10-47-541239-LON_PAR631_Parke_Road.jpg"
      crop={[0, 333, 5760, 2880]}
    />
  ));

