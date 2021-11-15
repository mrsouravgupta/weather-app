import { render, screen } from "@testing-library/react";
import Icon from "./Icon";

test("renders haze icon for no description", () => {
  const { container } = render(<Icon />);
  expect(container.getElementsByClassName("bi-cloud-haze").length).toBe(1);
});

test("renders sun icon for description clear", () => {
  const { container } = render(<Icon description="Clear" />);
  expect(container.getElementsByClassName("bi-sun").length).toBe(1);
});
