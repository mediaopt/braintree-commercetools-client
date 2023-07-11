import React from "react";
import { render, screen } from "@testing-library/react";
import { Result } from "./Result";

test("renders learn react link", () => {
  render(<Result />);
  const linkElement = screen.getByText(/Thank you for your purchase!/i);
  expect(linkElement).toBeInTheDocument();
});
