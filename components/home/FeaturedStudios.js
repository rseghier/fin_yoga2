import YogaStudioCard from '../YogaStudioCard';
import { useSearch } from '../../contexts/SearchContext';

export default function FeaturedStudios({ studios = [] }) {
  const { searchTerm, searchResults, isLoading } = useSearch();
  
  // Determine what to display based on search state
  const showSearchResults = searchTerm && searchTerm.trim() !== '';
  const displayStudios = showSearchResults ? searchResults : studios;
  const heading = showSearchResults 
    ? `Search results for "${searchTerm}"`
    : "Browsing featured studios";

  return (
    <section className="mb-16">
      <p className="text-sm text-gray-600 mb-4">{heading}</p>
      
      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading studios...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStudios.length > 0 ? (
            displayStudios.map((studio) => (
              <YogaStudioCard key={studio.id || studio.slug || `studio-${studio.title}`} studio={studio} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              {showSearchResults 
                ? `No studios found matching "${searchTerm}"`
                : "No featured studios available."}
            </div>
          )}
        </div>
      )}
    </section>
  );
} 