import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturedStudios from '../components/home/FeaturedStudios';
import FeaturedCities from '../components/home/FeaturedCities';
import ExploreCities from '../components/home/ExploreCities';
import { getFeaturedStudios } from '../utils/studioUtils';
import { generateSearchIndex } from '../utils/searchUtils';

export default function Home({ featuredStudios }) {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <HeroSection />
        <FeaturedStudios studios={featuredStudios} />
        <FeaturedCities />
        <ExploreCities />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Generate search index at build time
  generateSearchIndex();
  
  // Get the featured studios data
  const featuredStudios = getFeaturedStudios(4);
  
  // Ensure all data is serializable
  const serializedStudios = featuredStudios.map(studio => {
    // Create a new object with all undefined values replaced with null
    const serializedStudio = {};
    
    // Process all properties
    Object.keys(studio).forEach(key => {
      // Replace undefined with null, and convert Date objects to ISO strings
      if (studio[key] === undefined) {
        serializedStudio[key] = null;
      } else if (studio[key] instanceof Date) {
        serializedStudio[key] = studio[key].toISOString();
      } else {
        serializedStudio[key] = studio[key];
      }
    });
    
    return serializedStudio;
  });

  return {
    props: {
      featuredStudios: serializedStudios,
    },
  };
} 