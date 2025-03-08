import Link from 'next/link';

export default function YogaStudioCard({ studio }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/studios/${studio.url}`}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{studio.title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {studio.address && studio.address.substring(0, 60)}
            {!studio.address && `${studio.city}, ${studio.state}, ${studio.country || ''}`}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {studio.tags && studio.tags.slice(0, 4).map((tag, index) => (
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