import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturedStudios from '../components/home/FeaturedStudios';
import FeaturedCities from '../components/home/FeaturedCities';
import ExploreMoreCities from '../components/home/ExploreMoreCities';
import { getFeaturedStudios } from '../utils/studioUtils';
import { generateSearchIndex } from '../utils/searchUtils';
import { getCityStudioCounts } from '../utils/prismaUtils';

export default function Home({ featuredStudios, cityData }) {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <HeroSection />
        <FeaturedStudios studios={featuredStudios} />
        <FeaturedCities />
        <ExploreMoreCities cityData={cityData} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Generate search index at build time
  generateSearchIndex();
  
  // Get the featured studios data
  const featuredStudios = getFeaturedStudios(6);
  
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

  // Get city data from Prisma instead of reading from file
  const cityData = await getCityStudioCounts();
  
  // Sort cities by number of studios (descending)
  const sortedCityData = Object.entries(cityData)
    .sort(([, countA], [, countB]) => countB - countA)
    .reduce((acc, [city, count]) => {
      acc[city] = count;
      return acc;
    }, {});

  return {
    props: {
      featuredStudios: serializedStudios,
      cityData: sortedCityData,
    },
    // Revalidate the data once per day (in seconds)
    revalidate: 86400,
  };
} 