import * as React from "react";

export interface ImageProps {
  src: string;
  alt?: string;
  title?: string;
  hasImageLoaded?: boolean;
  onLoad: Function;
  onError?: Function;
}

const styles: React.CSSProperties = {
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    position: "relative",
    zIndex: 1,
    transition: "opacity 0.6s"
  }
};

const Image = ({
  onLoad,
  onError,
  hasImageLoaded = false,
  title,
  alt,
  src
}: ImageProps) => (
  <img
    onLoad={event => onLoad(event)}
    onError={event => onError && onError(event)}  
    src={src}
    title={title}
    style={{
      ...styles.image,
      opacity: Number(hasImageLoaded)
    }}
    alt={alt}
    draggable={false}
  />
);

export default Image;
