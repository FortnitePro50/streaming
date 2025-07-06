import React, { useState, useEffect } from 'react';
import { movieAPI } from '../services/api';
import ContentCard from '../components/ContentCard';
import Loading from '../components/Loading';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('popular');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { key: 'popular', name: 'Popular' },
    { key: 'top_rated', name: 'Top Rated' },
    { key: 'upcoming', name: 'Upcoming' },
    { key: 'trending', name: 'Trending' }
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        switch (category) {
          case 'popular':
            data = await movieAPI.getPopularMovies(page);
            break;
          case 'top_rated':
            data = await movieAPI.getTopRatedMovies(page);
            break;
          case 'upcoming':
            data = await movieAPI.getUpcomingMovies(page);
            break;
          case 'trending':
            data = await movieAPI.getTrendingMovies();
            break;
          default:
            data = await movieAPI.getPopularMovies(page);
        }
        
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="movies-page">
      <div className="content-section" style={{ paddingTop: '8rem' }}>
        <h1 className="section-title">Movies</h1>
        
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`category-btn ${category === cat.key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.key)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <>
            <div className="content-grid">
              {movies.map((movie) => (
                <ContentCard key={movie.id} item={movie} type="movie" />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;