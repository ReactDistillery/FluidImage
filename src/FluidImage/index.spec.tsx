import React from "react";
import TestRenderer, { create, ReactTestRenderer } from "react-test-renderer";
import Measure from "react-measure";
import FluidImage from "./";
import ThumbnailImage from "../ThumbnailImage";
import Image from "../Image";
import Placeholder from "../Placeholder";

const minimalProps = {
  src: "testImage.jpeg",
  crop: [0, 0, 100, 100]
};

const fullProps = {
  src: "testImage.jpeg",
  crop: [0, 0, 100, 100],
  alt: "an image",
  title: "an image",
  pixelRatio: 2,
  quality: 100,
  pattern: (any: any) => "url-pattern",
  thumbnailPattern: (any: any) => "thumbnail-url-pattern",
  hideThumbnailOnLoad: true,
  fillContainer: true,
  thumbnailSize: 16,
  backgroundColor: "red"
};

const props = [minimalProps, fullProps];

const loadThumbnail = (fluidImage: ReactTestRenderer) => {
  fluidImage.root
    .findByType(ThumbnailImage)
    .findByType("img")
    .props.onLoad();
};

const loadImage = (fluidImage: ReactTestRenderer) => {
  fluidImage.root
    .findByType(Image)
    .findByType("img")
    .props.onLoad();
};

describe("FluidImage - FluidImage", () => {
  describe("render skeletons", () => {
    props.forEach((prop, index) => {
      test(`it renders with ${index} from prop list`, () => {
        const fluidImage = create(<FluidImage {...prop} />).toJSON();
        expect(fluidImage).toMatchSnapshot();
      });
    });
  });
  describe("functional behaviour", () => {
    props.forEach((prop, index) => {
      test(`it renders \`<Image />\` after hasThumbnailLoaded is true with ${index} from prop list`, () => {
        const fluidImage = create(<FluidImage {...prop} />);
        loadThumbnail(fluidImage);
        const image = fluidImage.root.findByType(Image);
        expect(image).toBeTruthy();
      });
      test(`it sets the expected state when \`<Thumbnail />\` has loaded with ${index} from prop list`, () => {
        const fluidImage = create(<FluidImage {...prop} />);
        loadThumbnail(fluidImage);
        const state = fluidImage.root.instance.state;
        expect(state).toMatchSnapshot();
      });
      test(`it sets the expected state when \`<Image />\` has loaded with ${index} from prop list`, () => {
        const fluidImage = create(<FluidImage {...prop} />);
        loadThumbnail(fluidImage);
        loadImage(fluidImage);
        const state = fluidImage.root.instance.state;
        expect(state).toMatchSnapshot();
      });
      test(`it reloads \`<Image />\` if resized with ${index} from prop list`, () => {
        const fluidImage = create(<FluidImage {...prop} />);
        loadThumbnail(fluidImage);
        loadImage(fluidImage);
        const state = fluidImage.root.instance.state;
        expect(state).toMatchSnapshot();
        fluidImage.root.findByType(Measure).props.onResize({
          bounds: {
            height: 1200,
            width: 1200
          }
        });
        const stateAfterResize = fluidImage.root.instance.state;
        expect(stateAfterResize).toMatchSnapshot();
      });
      test("it renders `Placeholder` component when compoent throws an error", () => {
        const thumbnailPattern = (any: any) => {
          throw new Error("error");
        };
        const fluidImage = create(
          <FluidImage {...prop} thumbnailPattern={thumbnailPattern} />
        );
        expect(fluidImage.root.findByType(Placeholder)).toBeTruthy();
      });
    });
  });
});
