import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function SearchNavigation({ currentSlug }) {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [debugInfo, setDebugInfo] = useState({
    hasResults: false,
    resultsLength: 0,
    currentSlug: null,
    foundIndex: -1,
  });
  
  // Load search results and find current studio's index
  useEffect(() => {
    try {
      const savedResults = localStorage.getItem('searchResults');
      console.log('SearchNavigation: currentSlug =', currentSlug);
      console.log('SearchNavigation: savedResults =', savedResults ? JSON.parse(savedResults).length : 'none');
      
      if (savedResults && currentSlug) {
        const results = JSON.parse(savedResults);
        setSearchResults(results);
        
        // Find current studio index in search results - try both id and slug
        let index = results.findIndex(studio => studio.id === currentSlug);
        if (index === -1) {
          // Try matching by slug if id match fails
          index = results.findIndex(studio => studio.slug === currentSlug);
        }
        
        setCurrentIndex(index);
        
        // Debug info
        setDebugInfo({
          hasResults: true,
          resultsLength: results.length,
          currentSlug,
          foundIndex: index,
        });
        
        console.log('SearchNavigation: Found at index', index);
        if (index === -1) {
          // Log the first few studio IDs to debug
          console.log('SearchNavigation: First few studio ids:', 
            results.slice(0, 3).map(s => ({ id: s.id, slug: s.slug })));
        }
      }
    } catch (error) {
      console.error('Error loading search navigation:', error);
    }
  }, [currentSlug]);
  
  // If we don't have search results or current studio is not in results, don't show navigation
  if (searchResults.length <= 1 || currentIndex === -1) {
    return null;
  }
  
  // Navigate to previous studio in search results
  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? searchResults.length - 1 : currentIndex - 1;
    const prevStudio = searchResults[prevIndex];
    const studioUrl = `/studios/${prevStudio.id || prevStudio.slug}`;
    router.push(studioUrl);
  };
  
  // Navigate to next studio in search results
  const goToNext = () => {
    const nextIndex = currentIndex === searchResults.length - 1 ? 0 : currentIndex + 1;
    const nextStudio = searchResults[nextIndex];
    const studioUrl = `/studios/${nextStudio.id || nextStudio.slug}`;
    router.push(studioUrl);
  };
  
  return (
    <div className="mb-8">
      {/* Desktop and mobile navigation */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm">
        <button 
          onClick={goToPrevious}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center gap-2"
          aria-label="Previous studio"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="text-gray-600 text-sm md:text-base">
          <span className="hidden sm:inline">Browsing search results: </span>
          <span className="font-medium">{currentIndex + 1}</span> of <span className="font-medium">{searchResults.length}</span> studios
        </div>
        
        <button 
          onClick={goToNext}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center gap-2"
          aria-label="Next studio"
        >
          <span className="hidden sm:inline">Next</span>
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
} 