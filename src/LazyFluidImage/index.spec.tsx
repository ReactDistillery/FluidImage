import React from "react";
import { create } from "react-test-renderer";
import IntersectionObserver from "react-intersection-observer";
import LazyFluidImage from "./";
import Placeholder from "../Placeholder";
import FluidImage from "../FluidImage";

const minimalProps = {
  src: "testImage.jpeg",
  crop: [0, 0, 100, 100]
};

describe("FluidImage - LazyFluidImage", () => {
  it("renders", () => {
    const lazyFluidImage = create(
      <LazyFluidImage {...minimalProps} />
    ).toJSON();
    expect(lazyFluidImage).toMatchSnapshot();
  });
  it("shows `<Placeholder />` when state isInView is false", () => {
    const lazyFluidImage = create(<LazyFluidImage {...minimalProps} />);
    expect(lazyFluidImage.root.instance.state.isInView).toEqual(false);
    expect(lazyFluidImage.root.findByType(Placeholder)).toBeTruthy();
  });
  it("shows `<FluidImage /> when state isInView is true", () => {
    const lazyFluidImage = create(<LazyFluidImage {...minimalProps} />);
    expect(lazyFluidImage.root.instance.state.isInView).toEqual(false);
    lazyFluidImage.root.findByType(IntersectionObserver).props.onChange(true);
    expect(lazyFluidImage.root.findByType(FluidImage)).toBeTruthy();
  });
  it("updates state correctly when it comes in view", () => {
    const lazyFluidImage = create(<LazyFluidImage {...minimalProps} />);
    expect(lazyFluidImage.root.instance.state.isInView).toEqual(false);
    lazyFluidImage.root.findByType(IntersectionObserver).props.onChange(true);
    expect(lazyFluidImage.root.instance.state.isInView).toEqual(true);
  });
});
