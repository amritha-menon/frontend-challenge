// src/components/StarRating.js

import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const stars = Array.from({ length: 10 }, (_, index) => {
    if (index < fullStars) {
      return <span key={index} className="star filled">★</span>;
    } else if (index === fullStars && partialStar > 0) {
      return (
        <span key={index} className="star partial">
          <span className="partial-filled" style={{ width: `${partialStar * 100}%` }}>★</span>
          <span className="partial-empty">★</span>
        </span>
      );
    } else {
      return <span key={index} className="star">★</span>;
    }
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
