import * as React from "react";
import Measure, {
  ContentRect,
  BoundingRect,
  MeasuredComponentProps
} from "react-measure";

import Placeholder from "../Placeholder";
import Image from "../Image";
import ThumbnailImage from "../ThumbnailImage";
import ErrorBoundary from "../ErrorBoundary";
import { dppx } from '../utils';

export interface FluidImageProps extends React.Props<any> {
  src: string;
  alt?: string;
  title?: string;
  crop: Array<number>;
  pixelRatio?: number;
  quality?: number;
  pattern?: Function;
  thumbnailSize?: number;
  backgroundColor?: string;
  thumbnailPattern?: Function;
  hideThumbnailOnLoad?: boolean;
  fillContainer?: boolean;
}

export interface Pattern {
  src: string;
  width: number;
  height: number;
  crop: Array<number>;
  pixelRatio: number;
  quality: number;
}

export interface FluidImageState {
  hasImageLoaded: boolean;
  hasThumbnailLoaded: boolean;
}

const styles: React.CSSProperties = {
  container: {
    width: "100%",
    position: "absolute"
  }
};

const setThumbnailHasLoaded = (prevState: FluidImageState) => ({
  hasThumbnailLoaded: true
});
const setImageHasLoaded = (prevState: FluidImageState) => ({
  hasImageLoaded: true
});
const setImageUnLoaded = (prevState: FluidImageState) => ({
  hasImageLoaded: false
});
const defaultPattern = ({
  src,
  width,
  crop,
  pixelRatio,
  quality,
  height
}: Pattern): string =>
  `${src}?fit=crop&w=${Math.ceil(width)}&h=${Math.ceil(
    height
  )}&dpr=${pixelRatio}&q=${quality}&rect=${crop.join(",")}`;

export default class FluidImage extends React.Component<
  FluidImageProps,
  FluidImageState
> {
  state = {
    hasImageLoaded: false,
    hasThumbnailLoaded: false
  };

  private handleImageOnLoad = () => this.setState(setImageHasLoaded);
  private handleThumbnailOnLoad = () => this.setState(setThumbnailHasLoaded);
  private handleUpdate = (bounds: BoundingRect | undefined) =>
    this.setState(setImageUnLoaded);

  render() {
    const {
      src,
      alt,
      title,
      crop,
      pixelRatio = dppx(),
      quality = 80,
      pattern = defaultPattern,
      thumbnailSize = 8,
      backgroundColor = "#f9f9f9",
      thumbnailPattern = defaultPattern,
      hideThumbnailOnLoad = false,
      fillContainer = false
    } = this.props;

    const { hasImageLoaded, hasThumbnailLoaded } = this.state;
    return (
      <ErrorBoundary
        fillContainer={fillContainer}
        crop={crop}
        backgroundColor={backgroundColor}
      >
        <Measure
          bounds
          onResize={contentRect => this.handleUpdate(contentRect.bounds)}
        >
          {({ measureRef, contentRect: { bounds } }) => (
            <Placeholder
              placeholderRef={measureRef}
              fillContainer={fillContainer}
              crop={crop}
              backgroundColor={backgroundColor}
            >
              {bounds && (
                <span style={styles.container}>
                  <ThumbnailImage
                    onLoad={this.handleThumbnailOnLoad}
                    src={thumbnailPattern({
                      src,
                      crop,
                      pixelRatio,
                      quality,
                      width: thumbnailSize,
                      height: fillContainer
                        ? bounds.height / bounds.width * thumbnailSize
                        : crop[3] / crop[2] * bounds.width * thumbnailSize
                    })}
                    hasImageLoaded={hasThumbnailLoaded}
                    hideImageOnLoad={hideThumbnailOnLoad}
                    alt={alt}
                    title={title}
                  />
                  {hasThumbnailLoaded ? (
                    <Image
                      onLoad={this.handleImageOnLoad}
                      src={pattern({
                        width: bounds!.width,
                        height: fillContainer
                          ? bounds.height
                          : crop[3] / crop[2] * bounds.width,
                        src,
                        crop,
                        pixelRatio,
                        quality
                      })}
                      title={title}
                      alt={alt}
                      hasImageLoaded={hasImageLoaded}
                    />
                  ) : null}
                </span>
              )}
            </Placeholder>
          )}
        </Measure>
      </ErrorBoundary>
    );
  }
}
