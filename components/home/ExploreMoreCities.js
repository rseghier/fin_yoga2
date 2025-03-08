import { useSearch } from '../../contexts/SearchContext';
import { useRouter } from 'next/router';

export default function ExploreMoreCities({ cityData }) {
  const { setLocationSearchTerm } = useSearch();
  const router = useRouter();

  const handleCityClick = (cityName) => {
    // Replace underscores with spaces for the search
    const searchTerm = cityName.replace(/_/g, ' ');
    
    // Set the location search term in the context
    setLocationSearchTerm(searchTerm);
    
    // Scroll to the top of the page where the search bar is
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Check if cityData exists and is an object
  if (!cityData || typeof cityData !== 'object') {
    return null; // Don't render anything if cityData is not available
  }

  return (
    <section className="py-12 bg-gray-50" id="explore-more-cities">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore More Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(cityData).slice(0, 8).map(([city, count]) => (
            <div 
              key={city}
              onClick={() => handleCityClick(city)}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-semibold">{city.replace(/_/g, ' ')}</h3>
              <p className="text-sm text-gray-600">{count} {count === 1 ? 'studio' : 'studios'}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button 
            onClick={() => router.push('/cities')}
            className="text-primary font-medium hover:underline"
          >
            View All Cities
          </button>
        </div>
      </div>
    </section>
  );
} 