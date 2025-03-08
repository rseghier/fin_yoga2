import YogaStudioCard from '../YogaStudioCard';

// Mock data - in a real project, this would come from MDX files
const featuredStudios = [
  {
    title: 'Divine Values School',
    address: 'Maipu 1015, C1006ACT Ciudad Autónoma de Buenos Aires, Argentina',
    city: 'Buenos Aires',
    state: '',
    country: 'Argentina',
    url: 'divine-values-school',
    tags: ['meditation', 'mindfulness', 'traditional']
  },
  {
    title: 'Casa Lapau Yoga',
    address: 'Gandara, 4r Trinacriate vi C1427, Ciudad Autónoma de Buenos Aires, Argentina',
    city: 'Buenos Aires',
    state: '',
    country: 'Argentina',
    url: 'casa-lapau-yoga',
    tags: ['hatha', 'vinyasa', 'atmosphere']
  },
  {
    title: 'Puro YOGA',
    address: 'Bogotá 3755, C1407GZB Ciudad Autónoma de Buenos Aires, Argentina',
    city: 'Buenos Aires',
    state: '',
    country: 'Argentina',
    url: 'puro-yoga',
    tags: ['welcoming space', 'supportive community', 'variety']
  },
  {
    title: 'Mataji Yoga Institute',
    address: 'C. Dr. Juan Felipe Aranguren 2334, C1406 Ciudad Autónoma de Buenos Aires, Argentina',
    city: 'Buenos Aires',
    state: '',
    country: 'Argentina',
    url: 'mataji-yoga-institute',
    tags: ['supportive atmosphere', 'traditional']
  },
  {
    title: 'Bona Yoga',
    address: 'Castillo 384, C1414 Ciudad Autónoma de Buenos Aires, Argentina',
    city: 'Buenos Aires',
    state: '',
    country: 'Argentina',
    url: 'bona-yoga',
    tags: ['vinyasa yoga', 'transformative experience']
  },
  {
    title: 'Better Life Yoga',
    address: 'New No: 59, Old No: 16A, 4th St, Secretariat Colony, Chennai, Tamil Nadu 600099, India',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    url: 'Chennai_Better_Life_Yoga',
    tags: ['Hatha Yoga', 'Therapeutic Yoga', 'peaceful', 'supportive atmosphere']
  }
];

export default function FeaturedStudios() {
  return (
    <section className="mb-16">
      <p className="text-sm text-gray-600 mb-4">Browsing featured studios</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredStudios.map((studio, index) => (
          <YogaStudioCard key={index} studio={studio} />
        ))}
      </div>
    </section>
  );
} 