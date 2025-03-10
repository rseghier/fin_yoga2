import Link from 'next/link';

export default function YogaStudioCard({ studio }) {
  if (!studio) return null;

  const {
    title,
    slug,
    id,
    address,
    city,
    state,
    country,
    tags = [],
    summary
  } = studio;

  // Helper function to format text: replace underscores with spaces
  const formatText = (text) => {
    if (!text || text === "None") return null;
    return text.replace(/_/g, ' ');
  };

  // Generate location string, filtering out "None" values and formatting text
  const location = [
    formatText(city),
    formatText(state),
    formatText(country)
  ].filter(item => item !== null && item !== "None").join(', ');

  // Format address if it exists
  const formattedAddress = formatText(address);

  // Use slug if available, otherwise use id
  const studioUrl = `/studios/${slug || id}`;

  // Format title
  const formattedTitle = formatText(title);

  // Format summary
  const formattedSummary = formatText(summary);

  // Format tags: filter out "None" values and format each tag
  const formattedTags = tags
    .filter(tag => tag && tag !== "None")
    .map(tag => formatText(tag))
    .filter(Boolean);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link href={studioUrl}>
        <div className="p-4">
          {formattedTitle && (
            <h3 className="text-lg font-semibold mb-1">{formattedTitle}</h3>
          )}
          
          {/* Location info */}
          {(formattedAddress || location) && (
            <p className="text-sm text-gray-600 mb-2">
              {formattedAddress ? formattedAddress.substring(0, 60) : location}
            </p>
          )}
          
          {/* Summary if available */}
          {formattedSummary && (
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
              {formattedSummary}
            </p>
          )}
          
          {/* Tags */}
          {formattedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formattedTags.slice(0, 4).map((tag, index) => (
                <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
} 