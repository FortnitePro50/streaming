import React from 'react';

const Loading = ({ text = 'Loading...', type = 'spinner' }) => {
  if (type === 'skeleton') {
    return (
      <div className="content-grid">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="content-card">
            <div className="skeleton" style={{ height: '300px', borderRadius: '15px 15px 0 0' }} />
            <div className="card-content">
              <div className="skeleton" style={{ height: '20px', marginBottom: '10px', borderRadius: '4px' }} />
              <div className="skeleton" style={{ height: '16px', marginBottom: '10px', borderRadius: '4px', width: '70%' }} />
              <div className="skeleton" style={{ height: '14px', borderRadius: '4px', width: '90%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default Loading;