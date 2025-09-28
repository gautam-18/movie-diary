import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";

const MovieContext = createContext();

const initialState = {
  query: "",
  movies: [],
  isLoading: false,
  error: "",
  selectedId: "",
  watched: [],
};

function movieReducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SELECTED_ID":
      return { ...state, selectedId: action.payload };
    case "LOAD_WATCHED":
      return { ...state, watched: action.payload };
    case "ADD_WATCHED":
      return { ...state, watched: [...state.watched, action.payload] };
    case "REMOVE_WATCHED":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.imdbID !== action.payload
        ),
      };
    case "CLEAR_MOVIES":
      return { ...state, movies: [] };
    default:
      return state;
  }
}

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    const savedWatched = localStorage.getItem("movieWatchlist");
    if (savedWatched) {
      try {
        const parsedWatched = JSON.parse(savedWatched);
        dispatch({ type: "LOAD_WATCHED", payload: parsedWatched });
      } catch (error) {
        console.error("Error loading watchlist from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movieWatchlist", JSON.stringify(state.watched));
  }, [state.watched]);

  const actions = useMemo(
    () => ({
      setQuery: (query) => dispatch({ type: "SET_QUERY", payload: query }),
      setMovies: (movies) => dispatch({ type: "SET_MOVIES", payload: movies }),
      setLoading: (loading) =>
        dispatch({ type: "SET_LOADING", payload: loading }),
      setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
      setSelectedId: (id) => dispatch({ type: "SET_SELECTED_ID", payload: id }),
      addWatched: (movie) => dispatch({ type: "ADD_WATCHED", payload: movie }),
      removeWatched: (id) => dispatch({ type: "REMOVE_WATCHED", payload: id }),
      clearMovies: () => dispatch({ type: "CLEAR_MOVIES" }),
      loadWatched: (watched) =>
        dispatch({ type: "LOAD_WATCHED", payload: watched }),
    }),
    []
  );

  return (
    <MovieContext.Provider value={{ state, actions }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}
