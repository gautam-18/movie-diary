import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NavBar from "../../../components/NavBar";

describe("NavBar Component", () => {
  it("renders without crashing", () => {
    render(<NavBar>Test Content</NavBar>);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <NavBar>
        <div>Child 1</div>
        <div>Child 2</div>
      </NavBar>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("contains the main wrapper div with expected classes", () => {
    const { container } = render(<NavBar>Content</NavBar>);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("relative", "w-full");
  });

  it("renders the inner gradient divs", () => {
    const { container } = render(<NavBar>Content</NavBar>);

    const gradients = container.querySelectorAll("div.absolute");
    expect(gradients.length).toBeGreaterThanOrEqual(4);
  });
});
