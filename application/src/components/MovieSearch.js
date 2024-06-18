// src/components/MovieSearch.js

import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, Checkbox, Row, Col, Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Movie from '../models/Movie';
import BinarySearch from '../models/BinarySearch';
import StarRating from './StarRating';
import './MovieSearch.css';

const movies = [
  new Movie('The Matrix', 7.5, 'Action'),
  new Movie('Focus', 6.9, 'Comedy'),
  new Movie('The Lazarus Effect', 6.4, 'Thriller'),
  new Movie('Everly', 5.0, 'Action'),
  new Movie('Maps to the Stars', 7.5, 'Drama')
];

const genres = ['Action', 'Comedy', 'Thriller', 'Drama'];

const MovieSearch = ({ query, selectedRatings, selectedGenres, onRatingChange, onGenreChange, onSearch }) => {
  const [options, setOptions] = useState([]);
  const binarySearch = new BinarySearch(movies);

  useEffect(() => {
    filterAndSetOptions(query, selectedRatings, selectedGenres);
  }, [query, selectedRatings, selectedGenres]);

  const filterAndSetOptions = (searchValue, ratings, genres) => {
    let matches = binarySearch.search(searchValue);
    if (ratings.length > 0 && !ratings.includes('any')) {
      matches = matches.filter(movie => {
        const roundedRating = Math.floor(movie.rating);
        return ratings.includes(roundedRating);
      });
    }
    if (genres.length > 0 && !genres.includes('any')) {
      matches = matches.filter(movie => genres.includes(movie.category));
    }
    setOptions(matches.map(movie => movie.toOption()));
  };

  const renderTitle = (title, searchTerm) => {
    const parts = title.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  const renderOption = (movie) => {
    const rating = parseFloat(movie.label.split('Rating: ')[1].split(')')[0]);
    return {
      value: movie.value,
      label: (
        <div className="movie-option">
          <div className="movie-details">
            <div className="movie-title">{renderTitle(movie.value, query)}</div>
            <div className="movie-genre">{movie.label.split('(')[1].split(',')[0]}</div>
          </div>
          <StarRating rating={rating} />
        </div>
      )
    };
  };

  const handleRatingChange = (checkedValues) => {
    onRatingChange(checkedValues.length === 0 ? ['any'] : checkedValues);
  };

  const handleGenreChange = (checkedValues) => {
    onGenreChange(checkedValues.length === 0 ? ['any'] : checkedValues);
  };

  const ratingMenu = (
    <Menu>
      <Checkbox.Group onChange={handleRatingChange}>
        <Menu.Item key="any">
          <Checkbox value="any">Any rating</Checkbox>
        </Menu.Item>
        {[...Array(10)].map((_, i) => (
          <Menu.Item key={i + 1}>
            <Checkbox value={i + 1}>
              <StarRating rating={i + 1} />
            </Checkbox>
          </Menu.Item>
        ))}
      </Checkbox.Group>
    </Menu>
  );

  const genreMenu = (
    <Menu>
      <Checkbox.Group onChange={handleGenreChange}>
        <Menu.Item key="any">
          <Checkbox value="any">Any genre</Checkbox>
        </Menu.Item>
        {genres.map((genre, index) => (
          <Menu.Item key={index}>
            <Checkbox value={genre}>{genre}</Checkbox>
          </Menu.Item>
        ))}
      </Checkbox.Group>
    </Menu>
  );

  return (
    <div className="search-container">
      <AutoComplete
        style={{ width: 300 }}
        options={options.map(renderOption)}
        onSearch={onSearch}
        placeholder="Search for a movie..."
      >
        <Input />
      </AutoComplete>
      <Dropdown overlay={ratingMenu}>
        <Button>
          Rating <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown overlay={genreMenu}>
        <Button>
          Genre <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default MovieSearch;
