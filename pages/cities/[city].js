import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import YogaStudioCard from '../../components/YogaStudioCard';
import { getStudiosByCity } from '../../utils/studioUtils';
import fs from 'fs';
import path from 'path';

export default function CityPage({ cityName, topStudios, studioCount }) {
  // Format city name for display (replace underscores with spaces)
  const formattedCityName = cityName.replace(/_/g, ' ');
  
  return (
    <Layout title={`Top Yoga Studios in ${formattedCityName} | FindYoga`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
          <span className="mr-2">←</span>
          <span>Back to home</span>
        </Link>
        
        {/* Hero section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Top Yoga Studios in {formattedCityName}</h1>
          <p className="text-lg text-gray-700">
            Discover the best yoga studios {formattedCityName} has to offer. We've compiled a list of 
            top-rated yoga studios to help you find the perfect place for your practice.
          </p>
        </div>
        
        {/* Studios list - using similar styling to FeaturedStudios */}
        <section className="mb-16">
          <p className="text-sm text-gray-600 mb-4">
            Showing {topStudios.length} studios in {formattedCityName}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topStudios.length > 0 ? (
              topStudios.map((studio, index) => (
                <YogaStudioCard key={index} studio={studio} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                No studios found in {formattedCityName}.
              </div>
            )}
          </div>
        </section>
        
        {/* SEO content section */}
        <div className="mt-12 prose max-w-none">
          <h2>About Yoga in {formattedCityName}</h2>
          <p>
            {formattedCityName} has a thriving yoga community with {studioCount} yoga studios spread across the city.
            Whether you're a beginner looking to start your yoga journey or an experienced practitioner seeking 
            to deepen your practice, {formattedCityName} offers a diverse range of yoga styles and teaching approaches.
          </p>
          <p>
            The top yoga studios in {formattedCityName} featured on this page have been selected based on customer reviews,
            teaching quality, facilities, and overall experience. Each studio has its unique atmosphere and specialties,
            so we encourage you to explore and find the one that resonates with your personal yoga goals.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Read the city data from the JSON file
  const filePath = path.join(process.cwd(), 'data/cities/city_gym_counts.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const cityData = JSON.parse(fileContents);
  
  // Create paths for each city in the JSON file
  const paths = [];
  
  Object.keys(cityData).forEach(city => {
    // Add the original city name path (with underscores)
    paths.push({ params: { city } });
    
    // Add the lowercase version if it's different
    if (city !== city.toLowerCase()) {
      paths.push({ params: { city: city.toLowerCase() } });
    }
    
    // Add hyphenated version (both original case and lowercase)
    const hyphenatedCity = city.replace(/_/g, '-');
    if (hyphenatedCity !== city) {
      paths.push({ params: { city: hyphenatedCity } });
      paths.push({ params: { city: hyphenatedCity.toLowerCase() } });
    }
  });
  
  return {
    paths,
    fallback: false // Return 404 for non-existent slugs
  };
}

export async function getStaticProps({ params }) {
  // Get the city parameter from the URL
  let { city } = params;
  
  try {
    // Normalize the city parameter - convert hyphens to underscores
    const normalizedCity = city.replace(/-/g, '_');
    
    // Read city data from JSON file
    const filePath = path.join(process.cwd(), 'data/cities/city_gym_counts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const cityData = JSON.parse(fileContents);
    
    // Find the actual city name with correct casing by comparing case-insensitive
    // and checking both hyphenated and underscore versions
    const actualCityKey = Object.keys(cityData).find(
      key => key.toLowerCase() === normalizedCity.toLowerCase()
    );
    
    // If we found a matching city, use that key instead
    if (actualCityKey) {
      city = actualCityKey;
    } else {
      // No match found even after normalization
      return { notFound: true };
    }
    
    // Get the count of studios for this city
    const studioCount = cityData[city] || 0;
    
    if (!studioCount) {
      return {
        notFound: true
      };
    }
    
    // Get studios for this city
    const cityStudios = getStudiosByCity(city);
    
    // Create serializable version of the studios
    const serializedStudios = cityStudios.map(studio => {
      const serializedStudio = {};
      
      Object.keys(studio).forEach(key => {
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
        cityName: city,
        topStudios: serializedStudios,
        studioCount,
      },
    };
  } catch (error) {
    console.error(`Error generating page for city ${city}:`, error);
    return {
      notFound: true
    };
  }
} 