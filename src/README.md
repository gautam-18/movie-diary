# MovieApp - React Movie Search and Watchlist

A modern, responsive React application for searching movies and managing a personal watchlist. Built with React, Context API, React Router, and styled with Tailwind CSS.

## Live Demo : [Deployed on vercel](https://movie-diary-psi.vercel.app/)

## Features

- **Movie Search**: Search for movies using the OMDB API
- **Movie Details**: View detailed information about movies including plot, cast, director, and ratings
- **Watchlist Management**: Add movies to your personal watchlist with localStorage persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Modern UI**: Glassmorphism design with smooth animations and transitions
- **Client-side Routing**: Navigate between search and watchlist views
- **State Management**: Centralized state management using React Context API

## Technologies Used

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Modern icon library
- **Framer Motion** - Smooth animations
- **OMDB API** - Movie data source

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** 
- **OMDB API Key** (free from [omdbapi.com](http://omdbapi.com))

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gautam-18/movie-diary.git
cd movie-app
```

### 2. Install Dependencies

```bash
npm install
```



### 3. Environment Configuration

Create a `.env` file in the root directory and add your OMDB API key:

```env
VITE_API_KEY=your_OMDb_API_key_here
```

**Note**: The current implementation has the API key hardcoded. For production, update the components to use the environment variable:

```javascript
const KEY = import.meta.env.VITE_API_KEY;;
```

### 4. Install Additional Dependencies

```bash
npm install react-router-dom lucide-react framer-motion
```

### 5. Configure Tailwind CSS (if not already configured)

Install and configure Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
```

## Project Structure

```
src/
├── components/
│   ├── Logo.jsx
│   ├── NavBar.jsx
│   ├── Navigation.jsx
│   ├── Search.jsx
│   ├── SearchWithContext.jsx
│   ├── NumResult.jsx
│   ├── Movie.jsx
│   ├── MovieList.jsx
│   ├── MovieDetails.jsx
│   ├── Summary.jsx
│   ├── WatchedMovie.jsx
│   ├── WatchedMovieList.jsx
│   └── ui/
│       └── BackgroundBeams.jsx
├── pages/
│   ├── HomePage.jsx
│   └── WatchlistPage.jsx
├── context/
│   └── MovieContext.jsx
├── App.jsx
├── App.css
└── index.js
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`.



## Running Test Cases

### Unit Tests

```bash
npm run test
```

This runs the test suite in interactive watch mode.



## Key Features and Usage

### Searching Movies

1. Enter at least 3 characters in the search box
2. Movies will appear in a responsive grid layout
3. Click on any movie to view detailed information

### Managing Watchlist

1. Click on a movie to open the details sidebar
2. Click "Add to Watchlist" to save the movie
3. Navigate to "Watchlist" to view all saved movies
4. Remove movies using the trash icon

### Responsive Design

- **Mobile**: Single column layout, condensed navigation
- **Tablet**: Multi-column grid, balanced layout
- **Desktop**: Full grid layout, sidebar details

## Design Choices and Assumptions

### State Management
- **Choice**: React Context API with useReducer
- **Reasoning**: Provides centralized state management without external dependencies
- **Alternative**: Redux could be used for larger applications

### Data Persistence
- **Choice**: localStorage for client-side persistence
- **Assumption**: Users primarily access the app from the same device
- **Limitation**: Data is not synced across devices

### API Integration
- **Choice**: OMDB API for movie data
- **Assumption**: API key is available and rate limits are sufficient
- **Limitation**: API has daily request limits on free tier

### Responsive Breakpoints
- **xs**: 480px (extra small phones)
- **sm**: 640px (small tablets)
- **md**: 768px (medium tablets)
- **lg**: 1024px (laptops)
- **xl**: 1280px+ (desktop)

### Component Architecture
- **Choice**: Functional components with hooks
- **Reasoning**: Modern React patterns, better performance
- **State**: Context for global state, local state for component-specific data

### Styling Approach
- **Choice**: Tailwind CSS utility classes
- **Reasoning**: Rapid development, consistent design system
- **Custom**: Glassmorphism effects for modern UI

## Performance Considerations

- **Request Debouncing**: Could be added to search input to reduce API calls
- **Image Lazy Loading**: Implemented for movie posters
- **Code Splitting**: Routes are loaded dynamically
- **Memoization**: Consider adding React.memo for frequently re-rendered components

## Security Considerations

- **API Key**: Should be moved to environment variables
- **Input Sanitization**: Search inputs are safely handled
- **XSS Protection**: React provides built-in XSS protection

## Future Enhancements

- [ ] User authentication and cloud sync
- [ ] Movie ratings and reviews
- [ ] Advanced filtering and sorting
- [ ] Offline support with Service Workers
- [ ] Unit and integration tests
- [ ] Performance monitoring
- [ ] SEO optimization
- [ ] Dark/light theme toggle

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- [OMDB API](http://omdbapi.com) for movie data
- [Tailwind CSS](https://tailwindcss.com) for styling system
- [Lucide React](https://lucide.dev) for icons
- [React](https://reactjs.org) team for the excellent framework

## Troubleshooting

### Common Issues

**Movies not loading:**
- Check if OMDB API key is valid
- Ensure you're searching with at least 3 characters
- Check browser console for API errors

**Watchlist not persisting:**
- Verify localStorage is enabled in browser
- Check if you're in incognito/private mode

**Responsive issues:**
- Clear browser cache
- Ensure Tailwind CSS is properly configured
- Check if custom breakpoints are working


---
