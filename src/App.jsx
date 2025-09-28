import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import HomePage from "./pages/HomePage";
import WatchlistPage from "./pages/WatchlistPage";

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;
