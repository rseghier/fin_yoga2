import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from Next.js project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize Prisma client
const prisma = new PrismaClient();

// Define the structure of a yoga venue based on the JSON data
interface YogaVenue {
  title: string;
  subTitle: string | null;
  description: string | null;
  price: string | null;
  categoryName: string;
  address: string;
  neighborhood: string | null;
  street: string | null;
  city: string | null;
  postalCode: string | null;
  state: string | null;
  countryCode: string | null;
  website: string | null;
  phone: string | null;
  phoneUnformatted: string | null;
  claimThisBusiness: boolean;
  location: {
    lat: number;
    lng: number;
  };
  locatedIn: string | null;
  plusCode: string | null;
  menu: string | null;
  totalScore: number | null;
  permanentlyClosed: boolean;
  temporarilyClosed: boolean;
  placeId: string;
  reviews?: Array<{
    reviewer: string;
    text: string;
    rating: number;
    publishedAt: string;
  }>;
  openingHours?: Array<{
    dayOfWeek: string;
    openingTime: string;
    closingTime: string;
  }>;
  images?: Array<{
    imageUrl: string;
  }>;
}

/**
 * Imports data from a JSON file into the system
 * @param filePath Path to the JSON file to import
 */
async function importJsonData(filePath: string): Promise<YogaVenue[]> {
  try {
    // Read and parse the JSON file
    const rawData = fs.readFileSync(filePath, 'utf8');
    const venues: YogaVenue[] = JSON.parse(rawData);
    
    console.log(`Successfully loaded ${venues.length} venues from ${path.basename(filePath)}`);
    return venues;
  } catch (error) {
    console.error(`Error importing data from ${filePath}:`, error);
    throw error;
  }
}

/**
 * Map JSON data to match Prisma Studio model
 * @param venue The original venue data
 */
function mapVenueToPrismaModel(venue: YogaVenue) {
  return {
    title: venue.title,
    category: venue.categoryName,
    address: venue.address,
    neighborhood: venue.neighborhood,
    street: venue.street,
    city: venue.city,
    postalCode: venue.postalCode,
    state: venue.state,
    countryCode: venue.countryCode,
    website: venue.website,
    phone: venue.phone,
    latitude: venue.location?.lat || 0,
    longitude: venue.location?.lng || 0,
    totalScore: venue.totalScore,
    reviewsCount: venue.reviews?.length || 0,
    permanentlyClosed: venue.permanentlyClosed || false,
    temporarilyClosed: venue.temporarilyClosed || false,
    placeId: venue.placeId,
    url: venue.website,
    // Related data for creating nested records
    reviews: venue.reviews ? {
      create: venue.reviews.map(review => ({
        reviewer: review.reviewer || null,
        text: review.text || null,
        rating: review.rating || 0,
        publishedAt: new Date(review.publishedAt || Date.now())
      }))
    } : undefined,
    openingHours: venue.openingHours ? {
      create: venue.openingHours.map(hour => ({
        dayOfWeek: hour.dayOfWeek,
        openingTime: hour.openingTime,
        closingTime: hour.closingTime
      }))
    } : undefined,
    images: venue.images ? {
      create: venue.images.map(image => ({
        imageUrl: image.imageUrl
      }))
    } : undefined
  };
}

/**
 * Save venues to the database using Prisma
 * @param venues Array of processed venues
 */
async function saveVenuesToDatabase(venues: YogaVenue[]): Promise<void> {
  console.log(`Saving ${venues.length} venues to database...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const venue of venues) {
    try {
      // Check if the studio already exists in the database
      const existingStudio = await prisma.studio.findUnique({
        where: { placeId: venue.placeId }
      });

      if (existingStudio) {
        console.log(`Studio with placeId ${venue.placeId} already exists, skipping.`);
        continue;
      }

      // Map venue data to Prisma model
      const studioData = mapVenueToPrismaModel(venue);
      
      // Create studio with related data
      await prisma.studio.create({
        data: studioData
      });
      
      successCount++;
    } catch (error) {
      console.error(`Error saving venue "${venue.title}":`, error);
      errorCount++;
    }
  }
  
  console.log(`Import completed: ${successCount} venues imported successfully, ${errorCount} errors`);
}

/**
 * Main function to run the import process
 */
async function main() {
  try {
    // Get the file path from command line arguments
    const filePath = process.argv[2];
    
    if (!filePath) {
      console.error('Please provide a path to the JSON file to import');
      console.error('Usage: npx ts-node scripts/importData.ts <path-to-json-file>');
      process.exit(1);
    }
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    
    console.log(`Starting import process for ${filePath}...`);
    
    // Import data from the JSON file
    const importedVenues = await importJsonData(filePath);
    
    // Save venues to the database
    await saveVenuesToDatabase(importedVenues);
    
    console.log('Import process completed successfully!');
  } catch (error) {
    console.error('Import process failed:', error);
    process.exit(1);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

// Run the main function
main();

export {};  // Keep this if using ES Modules
