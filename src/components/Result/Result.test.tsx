import React from "react";
import { render, screen } from "@testing-library/react";
import { Result } from "./Result";

test("default success has default message", () => {
  render(<Result />);
  const linkElement = screen.getByText(/Thank you for your purchase!/i);
  expect(linkElement).toBeInTheDocument();
});

test("custom success message gets shown", () => {
  const customMessage: string = "custom message";
  render(<Result message={customMessage} />);
  const linkElement = screen.getByText(new RegExp(customMessage));
  expect(linkElement).toBeInTheDocument();
});

test("successful result has success classes", () => {
  const { container } = render(<Result />);
  // @ts-ignore
  expect(container.firstChild.className === "text-green-700");
});

test("unsuccessful result has failure classes", () => {
  const { container } = render(<Result />);
  // @ts-ignore
  expect(container.firstChild.className === "text-rose-600");
});

test("result component displays children", () => {
  const text: string = "My Label";
  render(
    <Result>
      <label>{text}</label>
    </Result>
  );
  const linkElement = screen.getByText(new RegExp(text));
  expect(linkElement).toBeInTheDocument();
});
