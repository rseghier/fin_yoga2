import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const studiosDirectory = path.join(process.cwd(), 'data/schools');

/**
 * Get paths for all studio MDX files for static generation
 */
export function getAllStudioSlugs() {
  try {
    const fileNames = fs.readdirSync(studiosDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => ({
        params: {
          slug: fileName.replace(/\.mdx$/, '')
        }
      }));
  } catch (error) {
    console.error('Error reading studio files:', error);
    return [];
  }
}

/**
 * Get data for a specific studio by slug
 */
export function getStudioData(slug) {
  try {
    const fullPath = path.join(studiosDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the MDX metadata and content
    const { data, content } = matter(fileContents);
    
    // Return the data with the slug and content
    return {
      slug,
      content,
      ...data
    };
  } catch (error) {
    console.error(`Error reading studio data for ${slug}:`, error);
    return null;
  }
}

/**
 * Extract gallery images from MDX content
 * This is a simple parser to find image URLs in the MDX content
 */
export function extractGalleryImages(content) {
  const regex = /src="(https:\/\/[^"]+)"/g;
  const matches = [...content.matchAll(regex)];
  return matches.map(match => match[1]);
}

/**
 * Get featured studios from MDX files
 * @param {number} limit - Maximum number of studios to return
 * @returns {Array} - Array of studio data objects
 */
export function getFeaturedStudios(limit = 4) {
  try {
    // Get all MDX files from the studios directory
    const fileNames = fs.readdirSync(studiosDirectory);
    const mdxFiles = fileNames.filter(fileName => fileName.endsWith('.mdx'));
    
    // Read and parse each file
    const studiosData = mdxFiles.map(fileName => {
      const fullPath = path.join(studiosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse the frontmatter and content
      const { data } = matter(fileContents);
      
      // Extract the first image from content if we need it
      let firstImage = null;
      if (fileContents.includes('src="https://')) {
        const match = fileContents.match(/src="(https:\/\/[^"]+)"/);
        if (match && match[1]) {
          firstImage = match[1];
        }
      }
      
      // Return a formatted object with necessary studio info
      return {
        title: data.title || 'Unnamed Studio',
        slug: fileName.replace(/\.mdx$/, ''),
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        country: data.country || null,
        summary: data.summary || null,
        tags: data.tags || [],
        gm_reviews_count: data.gm_reviews_count || 0,
        gm_totalScore: data.gm_totalScore || 0,
        image: firstImage
      };
    });
    
    // Sort by review count or total score (optional)
    const sortedStudios = studiosData.sort((a, b) => {
      // Sort by review count if available
      if (a.gm_reviews_count && b.gm_reviews_count) {
        return b.gm_reviews_count - a.gm_reviews_count;
      }
      // Fallback to total score
      return (b.gm_totalScore || 0) - (a.gm_totalScore || 0);
    });
    
    // Return limited number of studios
    return sortedStudios.slice(0, limit);
  } catch (error) {
    console.error('Error getting featured studios:', error);
    return [];
  }
}

/**
 * Get studios filtered by city
 * @param {string} city - The city name to filter studios by
 * @param {number} limit - Maximum number of studios to return
 * @returns {Array} - Array of studio data objects in the specified city
 */
export function getStudiosByCity(city, limit = 10) {
  try {
    // Normalize the city name for comparison (replace spaces with underscores)
    const normalizedCityName = city.replace(/\s+/g, '_').toLowerCase();
    
    // Get all studios data without limit
    const allStudios = getFeaturedStudios(100); // Get a large number temporarily
    
    // Filter studios by the normalized city name
    const cityStudios = allStudios.filter(studio => {
      if (!studio.city) return false;
      
      // Normalize the studio city name for comparison (case-insensitive)
      const normalizedStudioCity = studio.city.replace(/\s+/g, '_').toLowerCase();
      return normalizedStudioCity === normalizedCityName;
    });
    
    // Sort studios by rating (highest first)
    const sortedStudios = cityStudios.sort((a, b) => {
      // If both have ratings, sort by rating
      if (a.gm_totalScore && b.gm_totalScore) {
        return b.gm_totalScore - a.gm_totalScore;
      }
      // If only one has a rating, prioritize the one with a rating
      if (a.gm_totalScore) return -1;
      if (b.gm_totalScore) return 1;
      // If neither has a rating, sort alphabetically
      return a.title.localeCompare(b.title);
    });
    
    // Return limited number of studios
    return sortedStudios.slice(0, limit);
  } catch (error) {
    console.error(`Error getting studios for city ${city}:`, error);
    return [];
  }
} 