import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dataDirectory = path.join(process.cwd(), 'data');

export function getAllStudioPaths() {
  // This would scan your data directory for all MDX files
  // For now, we're just setting up the structure
  try {
    const directories = fs.readdirSync(dataDirectory);
    const allPaths = [];
    
    directories.forEach(dir => {
      const dirPath = path.join(dataDirectory, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath)
          .filter(file => file.endsWith('.mdx'));
          
        files.forEach(file => {
          allPaths.push({
            params: {
              id: file.replace(/\.mdx$/, '')
            }
          });
        });
      }
    });
    
    return allPaths;
  } catch (error) {
    console.error('Error reading studio paths:', error);
    return [];
  }
}

export function getStudioData(id) {
  // This would find and parse an MDX file by ID
  // For now, we're just setting up the structure
  try {
    // For a real implementation, you would search through directories
    const mdxFile = path.join(dataDirectory, 'schools', `${id}.mdx`);
    
    if (fs.existsSync(mdxFile)) {
      const fileContents = fs.readFileSync(mdxFile, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id,
        content,
        ...data
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error reading studio data for ${id}:`, error);
    return null;
  }
}

export function getFeaturedStudios(count = 6) {
  // This would return featured studios from your MDX files
  // For now, we're just setting up the structure
  try {
    const studioFiles = [];
    const directories = fs.readdirSync(dataDirectory);
    
    directories.forEach(dir => {
      const dirPath = path.join(dataDirectory, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath)
          .filter(file => file.endsWith('.mdx'));
          
        files.forEach(file => {
          studioFiles.push(path.join(dirPath, file));
        });
      }
    });
    
    const studios = studioFiles
      .map(filePath => {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        return {
          id: path.basename(filePath).replace(/\.mdx$/, ''),
          ...data
        };
      })
      .sort((a, b) => (b.gm_reviews_count || 0) - (a.gm_reviews_count || 0))
      .slice(0, count);
      
    return studios;
  } catch (error) {
    console.error('Error getting featured studios:', error);
    return [];
  }
}

export function getCitiesWithStudioCounts() {
  // This would return all cities with their studio counts
  // For now, we're just setting up the structure
  try {
    const studioFiles = [];
    const directories = fs.readdirSync(dataDirectory);
    
    directories.forEach(dir => {
      const dirPath = path.join(dataDirectory, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const files = fs.readdirSync(dirPath)
          .filter(file => file.endsWith('.mdx'));
          
        files.forEach(file => {
          studioFiles.push(path.join(dirPath, file));
        });
      }
    });
    
    const cityMap = {};
    
    studioFiles.forEach(filePath => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      if (data.city) {
        if (cityMap[data.city]) {
          cityMap[data.city]++;
        } else {
          cityMap[data.city] = 1;
        }
      }
    });
    
    return cityMap;
  } catch (error) {
    console.error('Error getting city counts:', error);
    return {};
  }
} 