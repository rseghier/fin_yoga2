import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get all cities and their studio counts from the database
 * @returns {Promise<Object>} Object with city names as keys and studio counts as values
 */
export async function getCityStudioCounts() {
  try {
    // Group by city and count studios in each city
    const cityCounts = await prisma.studio.groupBy({
      by: ['city'],
      _count: {
        id: true
      },
      where: {
        // Exclude null or empty cities
        city: {
          not: null,
          notIn: ['', 'None']
        }
      }
    });

    // Transform the result into the same format as before: { cityName: count }
    const cityData = cityCounts.reduce((acc, { city, _count }) => {
      if (city) {  // Additional check to ensure city exists
        acc[city] = _count.id;
      }
      return acc;
    }, {});

    return cityData;
  } catch (error) {
    console.error('Error fetching city studio counts:', error);
    return {};
  } finally {
    // No need to disconnect as Next.js handles Prisma lifecycle
  }
} 