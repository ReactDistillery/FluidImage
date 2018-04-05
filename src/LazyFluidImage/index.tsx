import * as React from "react";
import IntersectionObserver from "react-intersection-observer";
import FluidImage, { FluidImageProps } from "../FluidImage";
import Placeholder from "../Placeholder";

export interface LazyFluidImageState {
  isInView: boolean;
}
export default class LazyFluidImage extends React.Component<
  FluidImageProps,
  LazyFluidImageState
> {
  state = {
    isInView: false
  };

  setIsInView = (isInView: boolean) => this.setState(() => ({ isInView }));
  render() {
    const { isInView } = this.state;
    const { fillContainer, crop, backgroundColor, ...rest } = this.props;
    return (
      <IntersectionObserver
        tag="span"
        onChange={this.setIsInView}
        data-fluid-image
      >
        {isInView ? (
          <FluidImage fillContainer={fillContainer} crop={crop} {...rest} />
        ) : (
          <Placeholder
            fillContainer={fillContainer}
            crop={crop}
            backgroundColor={backgroundColor}
          />
        )}
      </IntersectionObserver>
    );
  }
}
