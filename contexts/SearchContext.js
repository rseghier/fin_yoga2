import { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load search index on component mount
  useEffect(() => {
    const fetchSearchIndex = async () => {
      try {
        const response = await fetch('/search-index.json');
        const data = await response.json();
        setSearchIndex(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading search index:', error);
        setIsLoading(false);
      }
    };

    fetchSearchIndex();
  }, []);

  // Search function
  const performSearch = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    
    // Search in title, location, and tags
    const results = searchIndex.filter(studio => {
      return (
        studio.title.toLowerCase().includes(lowerTerm) ||
        studio.location.toLowerCase().includes(lowerTerm) ||
        studio.city.toLowerCase().includes(lowerTerm) ||
        studio.state.toLowerCase().includes(lowerTerm) ||
        studio.country.toLowerCase().includes(lowerTerm) ||
        (studio.address && studio.address.toLowerCase().includes(lowerTerm)) ||
        (studio.tags && studio.tags.some(tag => 
          tag.toLowerCase().includes(lowerTerm)
        ))
      );
    });
    
    setSearchResults(results);
  };

  // Style search function
  const performStyleSearch = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    
    // Search only in tags
    const results = searchIndex.filter(studio => {
      return (
        studio.tags && studio.tags.some(tag => 
          tag.toLowerCase().includes(lowerTerm)
        )
      );
    });
    
    setSearchResults(results);
  };

  const value = {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    performSearch,
    performStyleSearch,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  return useContext(SearchContext);
} 