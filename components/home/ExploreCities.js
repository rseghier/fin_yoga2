import Link from 'next/link';

const cityCountMap = {
  'Buenos Aires': 32,
  'Chennai': 28,
  'Mumbai': 21,
  'Udaipur': 7,
  'Montreal': 6,
  'Pune, Pimpri-Chinchwad': 4,
  'Navi Mumbai': 3,
  'Mascouche': 4,
  'Santa Cruz de Tenerife': 3,
  'Paris': 2,
  'Brossard': 2,
  'Mira Bhayandar': 2,
  'Puerto de la Cruz': 2,
  'Thane': 2,
  'Badlapur': 2,
  'Puertito de Güimar': 1,
  'Châteauguay': 1,
  'Vasai-Virar': 1,
  'Pimpri-Chinchwad': 1,
  'Saint-Léonard': 1
};

export default function ExploreCities() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Explore More Cities</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
        {Object.entries(cityCountMap).map(([city, count], index) => (
          <div key={index} className="flex items-center justify-between">
            <Link href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-800 hover:text-primary">
              {city}
            </Link>
            <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs font-medium">
              {count}
            </span>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="btn px-6 py-3">
          View All Studios
        </button>
      </div>
    </section>
  );
} 