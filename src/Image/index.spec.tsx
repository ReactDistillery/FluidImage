import React from "react";
import { create, ReactTestRenderer } from "react-test-renderer";
import Image from "./";

const minimalProps = {
  src: "testImage.jpeg",
  onLoad: () => {}
};

const fullProps = {
  src: "testImage.jpeg",
  alt: "some description",
  title: "some title",
  hasImageLoaded: true,
  onLoad: () => {}
};

const findImg = (image: ReactTestRenderer) => (
  image.root.findByType("img")
);

describe("FluidImage - Image", () => {
  test("Renders an img with minimal props", () => {
    const image = create(<Image {...minimalProps} />).toJSON();
    expect(image).toMatchSnapshot();
  });
  test("Renders an img with full props", () => {
    const image = create(<Image {...fullProps} />).toJSON();
    expect(image).toMatchSnapshot();
  });
  test("it calls onLoad when image is loaded", () => {
    const onLoad = jest.fn();
    const image = create(<Image {...fullProps} onLoad={onLoad} />);
    findImg(image).props.onLoad();
    expect(onLoad.mock.calls.length).toBe(1);
  });
  test("it calls onError when image errors", () => {
    const onError = jest.fn();
    const image = create(<Image {...fullProps} onError={onError} />);
    findImg(image).props.onError();
    expect(onError.mock.calls.length).toBe(1);
  });
});
