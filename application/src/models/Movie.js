// src/models/Movie.js

class Movie {
    constructor(title, rating, category) {
      this.title = title;
      this.rating = rating;
      this.category = category;
    }
  
    matchesSearchTerm(searchTerm) {
      return this.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  
    toOption() {
      return { value: this.title, label: `${this.title} (${this.category}, Rating: ${this.rating})` };
    }
  }
  
  export default Movie;
  