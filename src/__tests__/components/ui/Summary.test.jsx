import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Summary from "../../../components/Summary";

describe("Summary Component", () => {
  it("renders correct values for a list of watched movies", () => {
    const watchedMovies = [
      { ImdbRating: 8, userRating: 9, runtime: "120" },
      { ImdbRating: 6, userRating: 7, runtime: "150" },
      { ImdbRating: 9, userRating: 8, runtime: "100" },
    ];

    render(<Summary watched={watchedMovies} />);

    expect(screen.getByText(/3 movies/i)).toBeInTheDocument();

    expect(screen.getByText("7.7")).toBeInTheDocument();

    expect(screen.getByText("8.0")).toBeInTheDocument();

    expect(screen.getByText("123 min")).toBeInTheDocument();
  });

  it("handles movies with missing ratings or runtime gracefully", () => {
    const watchedMovies = [
      { userRating: 5, runtime: "90" },
      { ImdbRating: 7 },
      {},
    ];

    render(<Summary watched={watchedMovies} />);

    expect(screen.getByText(/3 movies/i)).toBeInTheDocument();

    expect(screen.getByText("2.3")).toBeInTheDocument();

    expect(screen.getByText("1.7")).toBeInTheDocument();

    expect(screen.getByText("30 min")).toBeInTheDocument();
  });
});
