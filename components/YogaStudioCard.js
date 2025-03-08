import Link from 'next/link';

export default function YogaStudioCard({ studio }) {
  if (!studio) return null;

  const {
    title,
    slug,
    address,
    city,
    state,
    country,
    tags = [],
    summary
  } = studio;

  // Generate location string
  const location = [
    city,
    state,
    country
  ].filter(Boolean).join(', ');

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/studios/${slug}`}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          
          {/* Location info */}
          <p className="text-sm text-gray-600 mb-2">
            {address ? address.substring(0, 60) : location || 'Location not specified'}
          </p>
          
          {/* Summary if available */}
          {summary && (
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
              {summary}
            </p>
          )}
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.slice(0, 4).map((tag, index) => (
              <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
} 