import * as React from "react";

export interface PlaceholderProps {
  crop: Array<number>;
  backgroundColor?: string;
  fillContainer?: boolean;
  placeholderRef?(ref: Element | null): void;
  children?: any;
}

const styles: React.CSSProperties = {
  padding: {
    display: "inline-block",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    lineHeight: 0
  }
};

const generatePlaceholderStyles = (
  crop: Array<number>,
  fillContainer = false,
  backgroundColor = "#f9f9f9"
) => ({
  ...styles.padding,
  backgroundColor: backgroundColor,
  paddingBottom: fillContainer ? 0 : `${100 * (crop[3] / crop[2])}%`,
  height: fillContainer ? "100%" : 0
});

export default class Placeholder extends React.Component<PlaceholderProps, {}> {
  render() {
    const {
      backgroundColor,
      fillContainer,
      crop,
      placeholderRef,
      children
    } = this.props;
    return (
      <span
        ref={placeholderRef}
        style={generatePlaceholderStyles(crop, fillContainer, backgroundColor)}
      >
        {children}
      </span>
    );
  }
}
