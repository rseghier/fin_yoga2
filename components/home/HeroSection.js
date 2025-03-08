import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function HeroSection() {
  const [locationSearch, setLocationSearch] = useState('');
  const [styleSearch, setStyleSearch] = useState('');

  return (
    <section className="mb-12 text-center">
      <h1 className="text-4xl font-bold mb-2">Find Your Perfect Yoga Studio</h1>
      <p className="text-gray-600 mb-8">Discover the best yoga studios in your area</p>
      
      {/* Search Inputs */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by location (e.g., Brooklyn)"
            className="w-full py-3 px-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </button>
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by style (e.g., Vinyasa)"
            className="w-full py-3 px-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={styleSearch}
            onChange={(e) => setStyleSearch(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </button>
        </div>
      </div>
    </section>
  );
} 