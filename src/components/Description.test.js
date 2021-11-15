import { render, screen } from "@testing-library/react";
import Description from "./Description";

test("renders clear sky with initial character capital", () => {
  render(
    <Description main="clear sky" humidity="84" wind="2.5" unit="metric" />
  );
  const main = screen.getByText("Clear sky");
  expect(main).toBeInTheDocument();
});

test("renders wind speed in meters per second", () => {
  render(
    <Description main="clear sky" humidity="84" wind="2.5" unit="metric" />
  );
  const wind = screen.getByText(/2.5 m\/s/);
  expect(wind).toBeInTheDocument();
});

test("renders wind speed in miles per hour", () => {
  render(
    <Description main="clear sky" humidity="84" wind="2.5" unit="imperial" />
  );
  const wind = screen.getByText(/5.6 mph/);
  expect(wind).toBeInTheDocument();
});

test("renders humidity with percent symbol", () => {
  render(
    <Description main="clear sky" humidity="84" wind="2.5" unit="imperial" />
  );
  const humidity = screen.getByText(/84%/);
  expect(humidity).toBeInTheDocument();
});
