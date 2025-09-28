import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import MovieDetails from "../../../components/MovieDetails";

const API_KEY = "fake_api_key";
import.meta.env = { VITE_API_KEY: API_KEY };

vi.mock("lucide-react", () => ({
  X: () => <span>X Icon</span>,
  Star: () => <span>Star Icon</span>,
  Calendar: () => <span>Calendar Icon</span>,
  Clock: () => <span>Clock Icon</span>,
  User: () => <span>User Icon</span>,
  Film: () => <span>Film Icon</span>,
}));

const mockMovieData = {
  Title: "Inception",
  Year: "2010",
  Poster: "poster.jpg",
  Runtime: "148 min",
  imdbRating: "8.8",
  Plot: "A mind-bending thriller.",
  Released: "2010-07-16",
  Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt",
  Director: "Christopher Nolan",
  Genre: "Action, Sci-Fi",
};

describe("MovieDetails Component", () => {
  let fetchMock;
  const onCloseMock = vi.fn();
  const onAddWatchedMock = vi.fn();

  beforeEach(() => {
    fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockMovieData),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    onCloseMock.mockReset();
    onAddWatchedMock.mockReset();
  });

  it("renders loading state initially", () => {
    render(
      <MovieDetails
        selectedId="tt1375666"
        onClose={onCloseMock}
        onAddWatched={onAddWatchedMock}
        watched={[]}
      />
    );

    expect(screen.getByText(/loading movie details/i)).toBeInTheDocument();
  });

  it('calls onAddWatched when "Add to Watchlist" is clicked', async () => {
    render(
      <MovieDetails
        selectedId="tt1375666"
        onClose={onCloseMock}
        onAddWatched={onAddWatchedMock}
        watched={[]}
      />
    );

    await waitFor(() => screen.getByText("Add to Watchlist"));
    const button = screen.getByText("Add to Watchlist");

    fireEvent.click(button);

    expect(onAddWatchedMock).toHaveBeenCalledTimes(1);
    expect(onAddWatchedMock).toHaveBeenCalledWith(
      expect.objectContaining({
        imdbID: "tt1375666",
        title: "Inception",
        year: "2010",
        poster: "poster.jpg",
        ImdbRating: 8.8,
        imdbRating: 8.8,
        runtime: "148",
        userRating: 0,
      })
    );
  });

  it('shows "Already in your watchlist" if movie is watched', async () => {
    render(
      <MovieDetails
        selectedId="tt1375666"
        onClose={onCloseMock}
        onAddWatched={onAddWatchedMock}
        watched={[{ imdbID: "tt1375666" }]}
      />
    );

    await waitFor(() => screen.getByText(/already in your watchlist/i));
    expect(screen.getByText(/already in your watchlist/i)).toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", async () => {
    render(
      <MovieDetails
        selectedId="tt1375666"
        onClose={onCloseMock}
        onAddWatched={onAddWatchedMock}
        watched={[]}
      />
    );

    await waitFor(() => screen.getByText("X Icon"));
    const closeButton = screen.getByText("X Icon").closest("button");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking outside the sidebar", async () => {
    const { container } = render(
      <MovieDetails
        selectedId="tt1375666"
        onClose={onCloseMock}
        onAddWatched={onAddWatchedMock}
        watched={[]}
      />
    );

    await waitFor(() => screen.getByText("Inception"));
    fireEvent.mouseDown(document);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when pressing Escape key", async () => {
    render(
      <MovieDetails
        selectedId="tt1375666"
        onClose={onCloseMock}
        onAddWatched={onAddWatchedMock}
        watched={[]}
      />
    );

    await waitFor(() => screen.getByText("Inception"));
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
