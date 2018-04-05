import React from "react";
import { create, ReactTestRenderer } from "react-test-renderer";
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

const findImg = (thumbnailImage: ReactTestRenderer) => (
  thumbnailImage.root.findByType("img")
);

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
    findImg(thumbnailImage).props.onLoad();
    expect(onLoad.mock.calls.length).toBe(1);
  });
  test("it calls onError when image errors", () => {
    const onError = jest.fn();
    const thumbnailImage = create(
      <ThumbnailImage {...fullProps} onError={onError} />
    );
    findImg(thumbnailImage).props.onError();
    expect(onError.mock.calls.length).toBe(1);
  })
});
