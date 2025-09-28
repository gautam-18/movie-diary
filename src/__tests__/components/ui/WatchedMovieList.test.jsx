import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WatchedMovieList from "../../../components/WatchedMovieList";

vi.mock("../WatchedMovie", () => ({
  default: ({ movie, onDeleteWatched }) => (
    <div data-testid="watched-movie">
      <span>{movie.title}</span>
      <button onClick={() => onDeleteWatched(movie.imdbID)}>❌</button>
    </div>
  ),
}));

describe("WatchedMovieList Component", () => {
  const watchedMovies = [
    { imdbID: "1", title: "Movie One" },
    { imdbID: "2", title: "Movie Two" },
  ];

  it("calls onDeleteWatched when child delete button is clicked", () => {
    const onDeleteMock = vi.fn();
    render(
      <WatchedMovieList
        watched={watchedMovies}
        onDeleteWatched={onDeleteMock}
      />
    );

    const deleteButtons = screen.getAllByText("❌");
    fireEvent.click(deleteButtons[0]);
    expect(onDeleteMock).toHaveBeenCalledWith("1");

    fireEvent.click(deleteButtons[1]);
    expect(onDeleteMock).toHaveBeenCalledWith("2");
  });

  it("renders nothing if watched array is empty", () => {
    const { container } = render(
      <WatchedMovieList watched={[]} onDeleteWatched={vi.fn()} />
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
