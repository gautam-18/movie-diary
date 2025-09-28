import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Search from "../../../components/Search"; // adjust the path as needed

describe("Search Component", () => {
  it("renders without crashing", () => {
    const setQuery = vi.fn();
    render(<Search query="" setQuery={setQuery} />);

    const input = screen.getByPlaceholderText(/search movies/i);
    expect(input).toBeInTheDocument();
  });

  it("displays the correct initial value", () => {
    const setQuery = vi.fn();
    render(<Search query="Matrix" setQuery={setQuery} />);

    const input = screen.getByDisplayValue("Matrix");
    expect(input).toBeInTheDocument();
  });

  it("calls setQuery on input change", () => {
    const setQuery = vi.fn();
    render(<Search query="" setQuery={setQuery} />);

    const input = screen.getByPlaceholderText(/search movies/i);
    fireEvent.change(input, { target: { value: "Inception" } });

    expect(setQuery).toHaveBeenCalledTimes(1);
    expect(setQuery).toHaveBeenCalledWith("Inception");
  });

  it("input has correct placeholder text", () => {
    const setQuery = vi.fn();
    render(<Search query="" setQuery={setQuery} />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toBeInTheDocument();
  });
});
