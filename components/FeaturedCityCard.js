import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function FeaturedCityCard({ city, description }) {
  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden p-6">
      <h3 className="text-xl font-bold mb-2">{city}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <Link 
        href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
        className="inline-flex items-center text-sm font-medium text-white hover:text-gray-300"
      >
        <span>View Top Studios</span>
        <FaArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
} 