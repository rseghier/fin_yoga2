import { PrismaClient } from '@prisma/client'
import { logger } from './logger' // Add a logger utility

const prisma = new PrismaClient()

export async function getCityStudioCounts() {
  try {
    console.log('Starting getCityStudioCounts query...') // Debug log
    
    const studios = await prisma.studio.groupBy({
      by: ['city'],
      _count: {
        _all: true
      }
    })
    
    console.log('Query completed successfully:', studios) // Debug log
    return studios
    
  } catch (error) {
    console.error('Database query failed:', error)
    logger.error('Failed to fetch studio counts:', {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    })
    throw new Error('Failed to fetch studio data')
  }
} 