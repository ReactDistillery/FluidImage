import React from "react";
import { create } from "react-test-renderer";
import Placeholder from "./";

const minimalProps = {
  crop: [0, 0, 100, 100]
};

const fullProps = {
  crop: [0, 0, 100, 100],
  color: "red",
  fillContainer: true,
  placeholderRef: <div />
};

describe("FluidImage - Placeholder", () => {
  test("it renders a span with minimal props", () => {
    const placeholder = create(<Placeholder {...minimalProps} />).toJSON();
    expect(placeholder).toMatchSnapshot();
  });
  test("it renders a span with full props", () => {
    const placeholder = create(
      <Placeholder {...minimalProps}>{"children"}</Placeholder>
    ).toJSON();
    expect(placeholder).toMatchSnapshot();
  });
});
