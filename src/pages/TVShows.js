import React, { useState, useEffect } from 'react';
import { tvAPI } from '../services/api';
import ContentCard from '../components/ContentCard';
import Loading from '../components/Loading';

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('popular');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { key: 'popular', name: 'Popular' },
    { key: 'top_rated', name: 'Top Rated' },
    { key: 'trending', name: 'Trending' }
  ];

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      try {
        let data;
        switch (category) {
          case 'popular':
            data = await tvAPI.getPopularTVShows(page);
            break;
          case 'top_rated':
            data = await tvAPI.getTopRatedTVShows(page);
            break;
          case 'trending':
            data = await tvAPI.getTrendingTVShows();
            break;
          default:
            data = await tvAPI.getPopularTVShows(page);
        }
        
        setTvShows(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
        setLoading(false);
      }
    };

    fetchTVShows();
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
    <div className="tv-shows-page">
      <div className="content-section" style={{ paddingTop: '8rem' }}>
        <h1 className="section-title">TV Shows</h1>
        
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

        {/* TV Shows Grid */}
        {loading ? (
          <Loading type="skeleton" />
        ) : (
          <>
            <div className="content-grid">
              {tvShows.map((show) => (
                <ContentCard key={show.id} item={show} type="tv" />
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

export default TVShows;