import React from "react";
import { create } from "react-test-renderer";
import ThumbnailImage from "./";

const minimalProps = {
  src: "testImage.jpeg",
  onLoad: () => {}
};

const fullProps = {
  src: "testImage.jpeg",
  alt: "some description",
  title: "some title",
  hasImageLoaded: true,
  hideImageOnLoad: false,
  onLoad: () => {}
};

describe("FluidImage - ThumbnailImage", () => {
  test("Renders an img with minimal props", () => {
    const thumbnailImage = create(
      <ThumbnailImage {...minimalProps} />
    ).toJSON();
    expect(thumbnailImage).toMatchSnapshot();
  });
  test("Renders an img with full props", () => {
    const thumbnailImage = create(<ThumbnailImage {...fullProps} />).toJSON();
    expect(thumbnailImage).toMatchSnapshot();
  });
  test("it calls onLoad when image is loaded", () => {
    const onLoad = jest.fn();
    const thumbnailImage = create(
      <ThumbnailImage {...minimalProps} onLoad={onLoad} />
    );
    /* Had a lot of trouble getting onLoad to fire in Jest + JSDOM */
    thumbnailImage.root.findByType("img").props.onLoad();
    expect(onLoad.mock.calls.length).toBe(1);
  });
});
