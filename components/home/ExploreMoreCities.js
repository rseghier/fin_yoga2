import { useSearch } from '../../contexts/SearchContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ExploreMoreCities({ cityData }) {
  const { setLocationSearchTerm } = useSearch();
  const router = useRouter();

  const handleCityClick = (cityName) => {
    // Replace underscores with spaces for the search
    const searchTerm = cityName.replace(/_/g, ' ');
    
    // Set the location search term in the context
    setLocationSearchTerm(searchTerm);
    
    // Navigate to home page if we're not already there
    if (router.pathname !== '/') {
      router.push('/');
    } else {
      // Scroll to the top of the page where the search bar is
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Check if cityData exists and is an object
  if (!cityData || typeof cityData !== 'object') {
    return null; // Don't render anything if cityData is not available
  }

  // Get top 12 cities by studio count
  const topCities = Object.entries(cityData)
    .slice(0, 12)
    .map(([city, count]) => ({ name: city, count }));

  return (
    <section className="py-12 bg-gray-50" id="explore-more-cities">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Explore Cities</h2>
          <Link 
            href="/cities" 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All Cities
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topCities.map((city) => (
            <div 
              key={city.name}
              onClick={() => handleCityClick(city.name)}
              className="block p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="font-medium">{city.name}</div>
              <div className="text-gray-500 text-sm">
                {city.count} {city.count === 1 ? 'studio' : 'studios'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 