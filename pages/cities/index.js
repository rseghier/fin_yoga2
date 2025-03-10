import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { FaSearch } from 'react-icons/fa';
import { generateSearchIndex } from '../../utils/searchUtils';
import { getCityStudioCounts } from '../../utils/prismaUtils';
import { useSearch } from '../../contexts/SearchContext';

export default function AllCities({ cityData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 36;
  const router = useRouter();
  const { setLocationSearchTerm } = useSearch();
  
  // Filter cities based on search term
  const filteredCities = Object.keys(cityData)
    .filter(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();
  
  // Calculate pagination
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity);
  const totalPages = Math.ceil(filteredCities.length / citiesPerPage);
  
  // Generate alphabet index for quick navigation
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const alphabetIndex = alphabet.map(letter => {
    const hasCities = filteredCities.some(city => city.toUpperCase().startsWith(letter));
    return { letter, hasCities };
  });
  
  // Jump to cities starting with a specific letter
  const jumpToLetter = (letter) => {
    const index = filteredCities.findIndex(city => 
      city.toUpperCase().startsWith(letter)
    );
    if (index !== -1) {
      const page = Math.floor(index / citiesPerPage) + 1;
      setCurrentPage(page);
    }
  };
  
  // Handle city click to trigger search
  const handleCityClick = (cityName) => {
    // Replace underscores with spaces for the search
    const searchTerm = cityName.replace(/_/g, ' ');
    
    // Set the location search term in the context
    setLocationSearchTerm(searchTerm);
    
    // Navigate to home page
    router.push('/');
  };
  
  return (
    <Layout title="All Cities | FindYoga">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Cities with Yoga Studios</h1>
          <p className="text-gray-600 mb-8">
            Discover yoga studios in {filteredCities.length} cities around the world. Find the perfect studio near you or in a city you're planning to visit.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mb-8">
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          
          {/* Alphabet quick navigation */}
          <div className="flex flex-wrap justify-center mb-8 gap-1">
            {alphabetIndex.map(({ letter, hasCities }) => (
              <button
                key={letter}
                onClick={() => hasCities && jumpToLetter(letter)}
                disabled={!hasCities}
                className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium
                  ${hasCities 
                    ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
        
        {/* Display cities */}
        {currentCities.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentCities.map(city => (
                <div 
                  onClick={() => handleCityClick(city)}
                  key={city}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="font-medium text-lg mb-1">{city}</div>
                  <div className="text-gray-500 text-sm">
                    {cityData[city]} {cityData[city] === 1 ? 'studio' : 'studios'}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-l-md border border-gray-300 
                      ${currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Previous
                  </button>
                  
                  {/* Page number buttons */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Logic to show current page and nearby pages
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 border border-gray-300 border-l-0 
                          ${currentPage === pageNum 
                            ? 'bg-indigo-50 text-indigo-600 font-medium' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-r-md border border-gray-300 border-l-0 
                      ${currentPage === totalPages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No cities found matching "{searchTerm}".
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Show all cities
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Generate search index at build time
  generateSearchIndex();
  
  // Get city data from Prisma instead of reading from file
  const cityData = await getCityStudioCounts();
  
  // Sort cities by number of studios (descending)
  const sortedCityData = Object.entries(cityData)
    .sort(([, countA], [, countB]) => countB - countA)
    .reduce((acc, [city, count]) => {
      acc[city] = count;
      return acc;
    }, {});

  return {
    props: {
      cityData: sortedCityData,
    },
    // Revalidate the data once per day (in seconds)
    revalidate: 86400,
  };
} 