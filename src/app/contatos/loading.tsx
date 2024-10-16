// LoadingPage.js
import React from 'react';
import './style.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <h1 className="loading-text">Carregando</h1>
      <div className="dots">
        <div className="dot">.</div>
        <div className="dot">.</div>
        <div className="dot">.</div>
      </div>
    </div>
  );
};

export default Loading;
