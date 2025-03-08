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