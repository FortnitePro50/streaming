import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { movieAPI, tvAPI } from '../services/api';
import ContentCard from '../components/ContentCard';
import Loading from '../components/Loading';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingMoviesData, trendingTVData, popularMoviesData, popularTVData] = await Promise.all([
          movieAPI.getTrendingMovies(),
          tvAPI.getTrendingTVShows(),
          movieAPI.getPopularMovies(),
          tvAPI.getPopularTVShows()
        ]);

        setTrendingMovies(trendingMoviesData.results?.slice(0, 6) || []);
        setTrendingTVShows(trendingTVData.results?.slice(0, 6) || []);
        setPopularMovies(popularMoviesData.results?.slice(0, 6) || []);
        setPopularTVShows(popularTVData.results?.slice(0, 6) || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading text="Loading amazing content..." />;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to StreamFlix</h1>
          <p>Discover and stream thousands of movies and TV shows</p>
          <Link to="/movies" className="cta-button">
            Start Watching
          </Link>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="content-section">
        <h2 className="section-title">Trending Movies</h2>
        <div className="content-grid">
          {trendingMovies.map((movie) => (
            <ContentCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/movies" className="cta-button">
            View All Movies
          </Link>
        </div>
      </section>

      {/* Trending TV Shows */}
      <section className="content-section">
        <h2 className="section-title">Trending TV Shows</h2>
        <div className="content-grid">
          {trendingTVShows.map((show) => (
            <ContentCard key={show.id} item={show} type="tv" />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/tv-shows" className="cta-button">
            View All TV Shows
          </Link>
        </div>
      </section>

      {/* Popular Movies */}
      <section className="content-section">
        <h2 className="section-title">Popular Movies</h2>
        <div className="content-grid">
          {popularMovies.map((movie) => (
            <ContentCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>

      {/* Popular TV Shows */}
      <section className="content-section">
        <h2 className="section-title">Popular TV Shows</h2>
        <div className="content-grid">
          {popularTVShows.map((show) => (
            <ContentCard key={show.id} item={show} type="tv" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;