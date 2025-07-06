import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchAPI } from '../services/api';
import ContentCard from '../components/ContentCard';
import Loading from '../components/Loading';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');
    
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery, 1);
    }
  }, [location.search]);

  const performSearch = async (searchQuery, searchPage = 1) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const data = await searchAPI.searchMulti(searchQuery, searchPage);
      setResults(data.results || []);
      setTotalPages(data.total_pages || 1);
      setPage(searchPage);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    performSearch(query, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getContentType = (item) => {
    if (item.media_type === 'movie' || item.title) return 'movie';
    if (item.media_type === 'tv' || item.name) return 'tv';
    return 'movie'; // default
  };

  return (
    <div className="search-page">
      <div className="content-section" style={{ paddingTop: '8rem' }}>
        <h1 className="section-title">
          {query ? `Search Results for "${query}"` : 'Search'}
        </h1>
        
        {loading ? (
          <Loading type="skeleton" />
        ) : results.length > 0 ? (
          <>
            <div className="search-stats">
              <p>Found {results.length} results</p>
            </div>
            
            <div className="content-grid">
              {results.map((item) => (
                <ContentCard 
                  key={item.id} 
                  item={item} 
                  type={getContentType(item)}
                />
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
        ) : query ? (
          <div className="no-results">
            <h3>No results found for "{query}"</h3>
            <p>Try searching for something else</p>
          </div>
        ) : (
          <div className="search-placeholder">
            <h3>Start typing to search</h3>
            <p>Search for movies and TV shows</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;