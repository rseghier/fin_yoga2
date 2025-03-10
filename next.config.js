/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh5.googleusercontent.com'],
  },
  exportPathMap: async function(defaultPathMap) {
    // Filter out all the city-specific paths from default paths
    const filteredPaths = Object.keys(defaultPathMap)
      .filter(path => !path.match(/^\/cities\/[^/]+$/))
      .reduce((acc, path) => {
        acc[path] = defaultPathMap[path];
        return acc;
      }, {});
    
    return filteredPaths;
  },
}

module.exports = nextConfig 