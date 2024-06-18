// src/hocs/withFilters.js

import React, { useState } from 'react';

const withFilters = (WrappedComponent) => {
  return (props) => {
    const [selectedRatings, setSelectedRatings] = useState(['any']);
    const [selectedGenres, setSelectedGenres] = useState(['any']);
    const [query, setQuery] = useState('');

    const handleRatingChange = (checkedValues) => {
      setSelectedRatings(checkedValues.length === 0 ? ['any'] : checkedValues);
    };

    const handleGenreChange = (checkedValues) => {
      setSelectedGenres(checkedValues.length === 0 ? ['any'] : checkedValues);
    };

    const handleSearch = (value) => {
      setQuery(value);
    };

    return (
      <WrappedComponent
        {...props}
        query={query}
        selectedRatings={selectedRatings}
        selectedGenres={selectedGenres}
        onRatingChange={handleRatingChange}
        onGenreChange={handleGenreChange}
        onSearch={handleSearch}
      />
    );
  };
};

export default withFilters;
