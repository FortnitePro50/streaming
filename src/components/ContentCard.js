import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, formatDate } from '../services/api';

const ContentCard = ({ item, type }) => {
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const overview = item.overview;
  const posterPath = item.poster_path;
  const rating = item.vote_average;

  const getWatchUrl = () => {
    if (type === 'movie') {
      return `/watch/movie/${item.id}`;
    } else {
      return `/watch/tv/${item.id}`;
    }
  };

  return (
    <div className="content-card fade-in">
      <Link to={getWatchUrl()}>
        <div className="card-image">
          <img 
            src={getImageUrl(posterPath)} 
            alt={title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Image';
            }}
          />
          <div className="card-overlay">
            <div className="play-button">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="rgba(229, 9, 20, 0.9)"/>
                <path d="M25 20L40 30L25 40V20Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <div className="card-meta">
            <span className="card-type">{type === 'movie' ? 'Movie' : 'TV Show'}</span>
            {releaseDate && <span className="card-date">{formatDate(releaseDate)}</span>}
            {rating && (
              <span className="card-rating">
                ⭐ {rating.toFixed(1)}
              </span>
            )}
          </div>
          {overview && (
            <p className="card-description">{overview}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;