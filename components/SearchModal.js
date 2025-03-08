import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useSearch } from '../contexts/SearchContext';
import Link from 'next/link';

export default function SearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const { performSearch, searchResults, isLoading } = useSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  
  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);
  
  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    performSearch(value);
  };
  
  // Handle studio click
  const handleStudioClick = (studio) => {
    // Ensure search results are saved to localStorage before navigating
    try {
      if (searchResults.length > 0) {
        localStorage.setItem('searchResults', JSON.stringify(searchResults));
        console.log('Search results saved to localStorage:', searchResults.length);
      }
    } catch (error) {
      console.error('Error saving search results on click:', error);
    }
    
    // Close modal after clicking a result
    setTimeout(() => {
      onClose();
    }, 100);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Search header */}
        <div className="p-4 border-b flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for yoga studios..."
            className="flex-grow focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>
        
        {/* Search results */}
        <div className="overflow-y-auto flex-grow">
          {searchTerm === '' ? (
            <div className="p-8 text-center text-gray-500">
              Start typing to search for yoga studios
            </div>
          ) : isLoading ? (
            <div className="p-8 text-center">
              <p>Loading...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{searchTerm}"
            </div>
          ) : (
            <ul className="divide-y">
              {searchResults.map((studio) => (
                <li key={studio.id || `studio-${studio.title}`} onClick={() => handleStudioClick(studio)}>
                  <Link 
                    href={`/studios/${studio.id || studio.slug}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-lg">{studio.title}</div>
                    <div className="text-gray-500 text-sm">{studio.location}</div>
                    {studio.tags && studio.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {studio.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag} 
                            className="bg-gray-100 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {studio.tags.length > 3 && (
                          <span className="text-xs text-gray-500 px-1">
                            +{studio.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Search footer */}
        {searchResults.length > 0 && (
          <div className="p-3 border-t bg-gray-50 text-center text-sm text-gray-500">
            Found {searchResults.length} results for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
} 