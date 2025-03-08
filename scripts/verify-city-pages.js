/**
 * Script to verify all city pages defined in city_gym_counts.json will be generated
 */

const fs = require('fs');
const path = require('path');

// Get the paths
const cityDataPath = path.join(process.cwd(), 'data/cities/city_gym_counts.json');
const cityPagePath = path.join(process.cwd(), 'pages/cities/[city].js');

// Main verification function
async function verifyCityPages() {
  console.log('Verifying city pages will be generated...\n');
  
  // Check if the city data file exists
  if (!fs.existsSync(cityDataPath)) {
    console.error('❌ Error: city_gym_counts.json file not found!');
    console.log(`Expected at: ${cityDataPath}`);
    process.exit(1);
  }
  
  // Check if the [city].js file exists
  if (!fs.existsSync(cityPagePath)) {
    console.error('❌ Error: [city].js template file not found!');
    console.log(`Expected at: ${cityPagePath}`);
    process.exit(1);
  }
  
  // Read the city data
  const fileContents = fs.readFileSync(cityDataPath, 'utf8');
  const cityData = JSON.parse(fileContents);
  
  // Count cities
  const cityCount = Object.keys(cityData).length;
  
  console.log('✅ city_gym_counts.json file found');
  console.log('✅ [city].js template file found');
  console.log(`\nFound ${cityCount} cities that will have pages generated:\n`);
  
  // List all cities
  Object.entries(cityData)
    .sort((a, b) => b[1] - a[1]) // Sort by studio count (highest first)
    .forEach(([city, count], index) => {
      const formattedCity = city.replace(/_/g, ' ');
      console.log(`${index + 1}. ${formattedCity} (${count} studios) - /cities/${city}`);
    });
  
  console.log('\nAll city pages will be generated at build time via getStaticPaths.');
  console.log('To access any city page, visit: http://localhost:3000/cities/[city-name]');
  console.log('For example: http://localhost:3000/cities/Buenos_Aires');
}

// Run the verification
verifyCityPages()
  .then(() => {
    console.log('\n✅ Verification complete!');
  })
  .catch(error => {
    console.error('\n❌ Verification failed:', error);
    process.exit(1);
  }); 