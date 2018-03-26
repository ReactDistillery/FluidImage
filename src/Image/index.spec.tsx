import React from "react";
import { create } from "react-test-renderer";
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
    const image = create(<Image onLoad={onLoad} src="" />);
    image.root.findByType("img").props.onLoad();
    expect(onLoad.mock.calls.length).toBe(1);
  });
});
