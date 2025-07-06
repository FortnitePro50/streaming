import axios from 'axios';

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// For demo purposes, we'll use a free API key. In production, you should use your own.
const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// VidSrc API endpoints
const VIDSRC_BASE_URL = 'https://vidsrc.xyz/embed';
const VIDSRC_LATEST_MOVIES = 'https://vidsrc.xyz/movies/latest';
const VIDSRC_LATEST_TV = 'https://vidsrc.xyz/tvshows/latest';

export const movieAPI = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return { results: [] };
    }
  },

  // Get trending movies
  getTrendingMovies: async () => {
    try {
      const response = await api.get('/trending/movie/day');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return { results: [] };
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get('/search/movie', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return { results: [] };
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    try {
      const response = await api.get('/movie/top_rated', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return { results: [] };
    }
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1) => {
    try {
      const response = await api.get('/movie/upcoming', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      return { results: [] };
    }
  }
};

export const tvAPI = {
  // Get popular TV shows
  getPopularTVShows: async (page = 1) => {
    try {
      const response = await api.get('/tv/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      return { results: [] };
    }
  },

  // Get trending TV shows
  getTrendingTVShows: async () => {
    try {
      const response = await api.get('/trending/tv/day');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending TV shows:', error);
      return { results: [] };
    }
  },

  // Get TV show details
  getTVShowDetails: async (showId) => {
    try {
      const response = await api.get(`/tv/${showId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      return null;
    }
  },

  // Search TV shows
  searchTVShows: async (query, page = 1) => {
    try {
      const response = await api.get('/search/tv', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching TV shows:', error);
      return { results: [] };
    }
  },

  // Get top rated TV shows
  getTopRatedTVShows: async (page = 1) => {
    try {
      const response = await api.get('/tv/top_rated', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated TV shows:', error);
      return { results: [] };
    }
  },

  // Get TV show season details
  getSeasonDetails: async (showId, seasonNumber) => {
    try {
      const response = await api.get(`/tv/${showId}/season/${seasonNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching season details:', error);
      return null;
    }
  }
};

export const searchAPI = {
  // Search both movies and TV shows
  searchMulti: async (query, page = 1) => {
    try {
      const response = await api.get('/search/multi', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching:', error);
      return { results: [] };
    }
  }
};

export const vidsrcAPI = {
  // Get movie embed URL
  getMovieEmbedUrl: (imdbId) => {
    return `${VIDSRC_BASE_URL}/movie/${imdbId}`;
  },

  // Get TV show embed URL
  getTVShowEmbedUrl: (imdbId) => {
    return `${VIDSRC_BASE_URL}/tv/${imdbId}`;
  },

  // Get episode embed URL
  getEpisodeEmbedUrl: (imdbId, season, episode) => {
    return `${VIDSRC_BASE_URL}/tv/${imdbId}/${season}-${episode}`;
  },

  // Get latest movies from VidSrc
  getLatestMovies: async (page = 1) => {
    try {
      const response = await fetch(`${VIDSRC_LATEST_MOVIES}/page-${page}.json`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching latest movies from VidSrc:', error);
      return [];
    }
  },

  // Get latest TV shows from VidSrc
  getLatestTVShows: async (page = 1) => {
    try {
      const response = await fetch(`${VIDSRC_LATEST_TV}/page-${page}.json`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching latest TV shows from VidSrc:', error);
      return [];
    }
  }
};

// Helper function to get full image URL
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-image.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Helper function to get backdrop image URL
export const getBackdropUrl = (path, size = 'w1280') => {
  if (!path) return '/placeholder-backdrop.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Helper function to format date
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Helper function to format runtime
export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export default api;