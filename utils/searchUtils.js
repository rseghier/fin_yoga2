import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const studiosDirectory = path.join(process.cwd(), 'data/schools');

/**
 * Generate search index from all studio MDX files
 * This runs at build time to create a JSON file for client-side search
 */
export function generateSearchIndex() {
  try {
    // Get all MDX files
    const fileNames = fs.readdirSync(studiosDirectory);
    const mdxFiles = fileNames.filter(fileName => fileName.endsWith('.mdx'));
    
    // Process each file to extract searchable data
    const searchData = mdxFiles.map(fileName => {
      const fullPath = path.join(studiosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse frontmatter
      const { data } = matter(fileContents);
      
      // Generate location string for searching
      const location = [data.city, data.state, data.country]
        .filter(Boolean)
        .join(', ');
      
      // Return simplified data structure for search
      return {
        id: fileName.replace(/\.mdx$/, ''),
        title: data.title || 'Unnamed Studio',
        location,
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
        address: data.address || '',
        tags: data.tags || [],
        summary: data.summary || '',
        gm_reviews_count: data.gm_reviews_count || 0,
        gm_totalScore: data.gm_totalScore || 0,
      };
    });
    
    // Write the search index to public directory for client access
    const publicDir = path.join(process.cwd(), 'public');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    fs.writeFileSync(
      path.join(publicDir, 'search-index.json'),
      JSON.stringify(searchData)
    );
    
    console.log('Search index generated successfully.');
    return searchData;
  } catch (error) {
    console.error('Error generating search index:', error);
    return [];
  }
} 