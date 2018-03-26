import * as React from "react";

export interface ThumbnailImageProps {
  src: string;
  alt?: string;
  title?: string;
  hasImageLoaded?: boolean;
  hideImageOnLoad?: boolean;
  onLoad: Function;
}

const styles: React.CSSProperties = {
  thumbnailImage: {
    width: "100%",
    height: "auto",
    position: "absolute",
    zIndex: 0,
    transition: "opacity 0.6s"
  }
};

const ThumbnailImage = ({
  onLoad,
  hasImageLoaded = false,
  hideImageOnLoad = false,
  title,
  alt,
  src
}: ThumbnailImageProps) => (
  <img
    onLoad={() => onLoad()}
    src={src}
    title={title}
    style={{
      ...styles.thumbnailImage,
      opacity: Number(!hideImageOnLoad && hasImageLoaded)
    }}
    alt={alt}
    draggable={false}
  />
);

export default ThumbnailImage;
