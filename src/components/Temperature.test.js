import { render, screen } from "@testing-library/react";
import Temperature from "./Temperature";

test("renders magnitude rounded to nearest whole number", () => {
  render(<Temperature magnitude="23.54" unit="metric" />);
  const magnitude = screen.getByText(/24/);
  expect(magnitude).toBeInTheDocument();
});

test("renders magnitude up to 2 decimal places", () => {
  render(<Temperature magnitude="23.5478" unit="metric" small={true} />);
  const magnitude = screen.getByText(/23.55/);
  expect(magnitude).toBeInTheDocument();
});

test("renders magnitude in fahrenheit", () => {
  render(<Temperature magnitude="23.54" unit="imperial" />);
  const magnitude = screen.getByText(/74/);
  expect(magnitude).toBeInTheDocument();
});

test("renders magnitude in fahrenheit up to 2 decimal places", () => {
  render(<Temperature magnitude="23.54" unit="imperial" small={true} />);
  const magnitude = screen.getByText(/74.37/);
  expect(magnitude).toBeInTheDocument();
});
