export interface withCropPattern {
  src: string;
  width: number;
  height: number;
  crop: Array<number>;
  pixelRatio: number;
  quality: number;
};

export const withCropPattern = ({
  src,
  width,
  crop,
  pixelRatio,
  quality,
  height
}: withCropPattern): string =>
  `${src}?fit=crop&w=${Math.ceil(width)}&h=${Math.ceil(
    height
  )}&dpr=${pixelRatio}&q=${quality}&rect=${crop.join(",")}`;
