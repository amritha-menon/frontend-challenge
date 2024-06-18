// src/models/BinarySearch.js

class BinarySearch {
    constructor(array) {
      this.array = array;
      console.log('Array')
      console.log(array)
    }
  
    search(searchTerm) {
      const sortedArray = [...this.array].sort((a, b) => a.title.localeCompare(b.title));
      let left = 0;
      let right = sortedArray.length - 1;
      let matches = [];
  
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        console.log(sortedArray[mid])
        if (sortedArray[mid].matchesSearchTerm(searchTerm)) {
          matches.push(sortedArray[mid]);
          matches = [...matches, ...this.searchLeft(sortedArray, searchTerm, left, mid - 1)];
          matches = [...matches, ...this.searchRight(sortedArray, searchTerm, mid + 1, right)];
          break;
        } else if (sortedArray[mid].title.toLowerCase() < searchTerm.toLowerCase()) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return matches;
    }
  
    searchLeft(array, searchTerm, left, right) {
      let matches = [];
      while (left <= right) {
        if (array[right].matchesSearchTerm(searchTerm)) {
          matches.push(array[right]);
        }
        right--;
      }
      return matches;
    }
  
    searchRight(array, searchTerm, left, right) {
      let matches = [];
      while (left <= right) {
        if (array[left].matchesSearchTerm(searchTerm)) {
          matches.push(array[left]);
        }
        left++;
      }
      return matches;
    }
  }
  
  export default BinarySearch;
  