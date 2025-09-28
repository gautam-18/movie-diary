import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WatchedMovie from "../../../components/WatchedMovie";

describe("WatchedMovie Component", () => {
  const movie = {
    imdbID: "tt1234567",
    title: "Inception",
    poster: "poster.jpg",
    imdb: 8.8,
    userRating: 9,
    runtime: "148 min",
  };

  it("calls onDeleteWatched when delete button is clicked", () => {
    const onDeleteMock = vi.fn();
    render(<WatchedMovie movie={movie} onDeleteWatched={onDeleteMock} />);

    const deleteButton = screen.getByText("❌");
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith("tt1234567");
  });
});
