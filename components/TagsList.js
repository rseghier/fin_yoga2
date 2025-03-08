import Link from 'next/link';

export default function TagsList({ tags }) {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <Link 
          key={index}
          href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-block px-3 py-1 text-xs font-medium text-pink-600 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
} 