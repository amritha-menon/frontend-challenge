// src/App.js

import React from 'react';
import './App.css';
import MovieSearch from './components/MovieSearch';
import withFilters from './hocs/withFilters';

const FilteredMovieSearch = withFilters(MovieSearch);

function App() {
  return (
    <div className="App">
      <h1>Movie Search</h1>
      <FilteredMovieSearch />
    </div>
  );
}

export default App;
