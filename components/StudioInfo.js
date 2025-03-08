import Link from 'next/link';

export default function StudioInfo({ category, address, website, phone, score, reviewCount }) {
  return (
    <div className="space-y-3 mb-8">
      {category && (
        <div>
          <strong className="text-gray-700">Category:</strong> {category}
        </div>
      )}
      
      {address && (
        <div>
          <strong className="text-gray-700">Address:</strong> {address}
        </div>
      )}
      
      {website && (
        <div>
          <strong className="text-gray-700">Website:</strong>{' '}
          <Link 
            href={website.startsWith('http') ? website : `https://${website}`} 
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </Link>
        </div>
      )}
      
      {phone && (
        <div>
          <strong className="text-gray-700">Phone:</strong> {phone}
        </div>
      )}
      
      {score && (
        <div>
          <strong className="text-gray-700">Score:</strong> {score} 
          {reviewCount && <span> based on {reviewCount} reviews</span>}
        </div>
      )}
    </div>
  );
} 