import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieList from "../../../components/MovieList";

vi.mock("../Movie", () => ({
  default: ({ movie, onSelectMovie }) => (
    <div data-testid="movie-item" onClick={() => onSelectMovie(movie.imdbID)}>
      {movie.Title}
    </div>
  ),
}));

describe("MovieList Component", () => {
  const movies = [
    { imdbID: "1", Title: "Movie One" },
    { imdbID: "2", Title: "Movie Two" },
  ];

  it("calls onSelectMovie when a movie is clicked", () => {
    const onSelectMovie = vi.fn();
    render(<MovieList movies={movies} onSelectMovie={onSelectMovie} />);

    fireEvent.click(screen.getByText("Movie One"));
    expect(onSelectMovie).toHaveBeenCalledWith("1");

    fireEvent.click(screen.getByText("Movie Two"));
    expect(onSelectMovie).toHaveBeenCalledWith("2");
  });

  it("renders nothing if movies prop is empty", () => {
    const onSelectMovie = vi.fn();
    const { container } = render(
      <MovieList movies={[]} onSelectMovie={onSelectMovie} />
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
