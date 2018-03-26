import React from "react";
import TestRenderer, { create, ReactTestRenderer } from "react-test-renderer";
import ErrorBoundary from "./";
import Placeholder from "../Placeholder";

const minimalProps = {
  crop: [0, 0, 100, 100]
};
const child = <div>{"child"}</div>;

describe("FluidImage - ErrorBoundary", () => {
  it("should render children as standard", () => {
    const errorBoundary = create(
      <ErrorBoundary {...minimalProps}>{child}</ErrorBoundary>
    ).toJSON();
    expect(errorBoundary).toMatchSnapshot();
  });
  it("should render `Placeholder` component when state hasError is true", () => {
    const errorBoundary = create(
      <ErrorBoundary {...minimalProps}>{child}</ErrorBoundary>
    );
    errorBoundary.root.instance.setState(() => ({ hasError: true }));
    expect(errorBoundary.root.findByType(Placeholder)).toBeTruthy();
    expect(errorBoundary.toJSON()).toMatchSnapshot();
  });
  it("should update state when componentDidCatch is called", () => {
    const errorBoundary = create(
      <ErrorBoundary {...minimalProps}>{child}</ErrorBoundary>
    );
    const initialState = errorBoundary.root.instance.state;
    expect(initialState.hasError).toBe(false);
    errorBoundary.root.instance.componentDidCatch();
    const errorState = errorBoundary.root.instance.state;
    expect(errorState.hasError).toBe(true);
  });
});
