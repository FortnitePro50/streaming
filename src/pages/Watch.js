import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieAPI, tvAPI, vidsrcAPI } from '../services/api';
import Loading from '../components/Loading';

const Watch = () => {
  const { type, id, season, episode } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(season || 1);
  const [currentEpisode, setCurrentEpisode] = useState(episode || 1);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (type === 'movie') {
          const movieData = await movieAPI.getMovieDetails(id);
          setContent(movieData);
        } else if (type === 'tv') {
          const tvData = await tvAPI.getTVShowDetails(id);
          setContent(tvData);
          
          if (tvData?.seasons) {
            setSeasons(tvData.seasons);
            
            // Fetch episodes for the current season
            const seasonData = await tvAPI.getSeasonDetails(id, currentSeason);
            setEpisodes(seasonData?.episodes || []);
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [type, id, currentSeason]);

  const getEmbedUrl = () => {
    if (type === 'movie') {
      return vidsrcAPI.getMovieEmbedUrl(id);
    } else if (type === 'tv') {
      return vidsrcAPI.getEpisodeEmbedUrl(id, currentSeason, currentEpisode);
    }
    return '';
  };

  const handleSeasonChange = async (newSeason) => {
    setCurrentSeason(newSeason);
    setCurrentEpisode(1);
    
    try {
      const seasonData = await tvAPI.getSeasonDetails(id, newSeason);
      setEpisodes(seasonData?.episodes || []);
    } catch (error) {
      console.error('Error fetching season data:', error);
    }
  };

  const handleEpisodeChange = (newEpisode) => {
    setCurrentEpisode(newEpisode);
    navigate(`/watch/tv/${id}/${currentSeason}/${newEpisode}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading text="Loading content..." />;
  }

  if (!content) {
    return (
      <div className="error-container">
        <h2>Content not found</h2>
        <button onClick={goBack} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="watch-page">
      {/* Video Player */}
      <div className="video-player">
        <div className="player-controls">
          <button onClick={goBack} className="back-button">
            ← Back
          </button>
        </div>
        
        {videoLoading && (
          <div className="video-loading">
            <Loading text="Loading video..." />
          </div>
        )}
        
        <iframe
          src={getEmbedUrl()}
          title={content.title || content.name}
          allowFullScreen
          onLoad={() => setVideoLoading(false)}
          style={{ display: videoLoading ? 'none' : 'block' }}
        />
      </div>

      {/* Content Info */}
      <div className="watch-info">
        <div className="content-section">
          <h1 className="watch-title">
            {content.title || content.name}
            {type === 'tv' && (
              <span className="episode-info">
                {' '}S{currentSeason}E{currentEpisode}
              </span>
            )}
          </h1>
          
          <div className="watch-meta">
            <span className="rating">⭐ {content.vote_average?.toFixed(1)}</span>
            <span className="year">
              {new Date(content.release_date || content.first_air_date).getFullYear()}
            </span>
            {content.runtime && (
              <span className="runtime">{content.runtime} min</span>
            )}
          </div>

          <p className="watch-description">{content.overview}</p>

          {/* TV Show Controls */}
          {type === 'tv' && (
            <div className="tv-controls">
              {/* Season Selector */}
              {seasons.length > 1 && (
                <div className="season-selector">
                  <label>Season:</label>
                  <select 
                    value={currentSeason} 
                    onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
                  >
                    {seasons.map((season) => (
                      <option key={season.season_number} value={season.season_number}>
                        Season {season.season_number}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Episode Selector */}
              {episodes.length > 0 && (
                <div className="episode-selector">
                  <label>Episode:</label>
                  <select 
                    value={currentEpisode} 
                    onChange={(e) => handleEpisodeChange(parseInt(e.target.value))}
                  >
                    {episodes.map((ep) => (
                      <option key={ep.episode_number} value={ep.episode_number}>
                        Episode {ep.episode_number}: {ep.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watch;