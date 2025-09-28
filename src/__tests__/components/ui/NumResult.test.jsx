import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NumResult from "../../../components/NumResult";

describe("NumResult Component", () => {
  it("renders the number of movies correctly", () => {
    const movies = [
      { imdbID: "1", Title: "Movie One" },
      { imdbID: "2", Title: "Movie Two" },
      { imdbID: "3", Title: "Movie Three" },
    ];

    render(<NumResult movies={movies} />);

    expect(screen.getByText("Found 3 results")).toBeInTheDocument();
  });

  it("renders zero when movies array is empty", () => {
    render(<NumResult movies={[]} />);

    expect(screen.getByText("Found 0 results")).toBeInTheDocument();
  });
});
