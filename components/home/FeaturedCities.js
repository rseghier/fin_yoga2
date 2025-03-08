import FeaturedCityCard from '../FeaturedCityCard';

const featuredCities = [
  {
    name: 'Buenos Aires',
    description: 'Discover thriving yoga scene in the Paris of South America. Explore top-rated studios combining traditional practices with modern approaches.'
  },
  {
    name: 'Mumbai',
    description: 'Experience authentic yoga in the heart of India. Find studios that blend traditional wisdom with contemporary wellness.'
  },
  {
    name: 'Chennai',
    description: 'Immerse yourself in the cultural capital of South India. Explore studios offering authentic yoga traditions and spiritual practices.'
  },
  {
    name: 'Udaipur',
    description: 'Practice yoga in the serene City of Lakes. Find peaceful studios with breathtaking views and expert instruction.'
  }
];

export default function FeaturedCities() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Featured Cities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredCities.map((city, index) => (
          <FeaturedCityCard 
            key={index} 
            city={city.name} 
            description={city.description} 
          />
        ))}
      </div>
    </section>
  );
} 