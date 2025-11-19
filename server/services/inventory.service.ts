import { PrismaClient, TravelMode } from '@prisma/client';

const prisma = new PrismaClient();

export interface InventorySearchFilters {
  travelMode?: TravelMode;
  location?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  limit?: number;
  offset?: number;
}

export class InventoryService {
  
  /**
   * Search inventory items
   */
  static async searchInventory(filters: InventorySearchFilters) {
    const where: any = {};
    
    if (filters.travelMode) where.travelMode = filters.travelMode;
    if (filters.isAvailable !== undefined) where.isAvailable = filters.isAvailable;
    
    if (filters.location) {
      where.searchableLocation = {
        contains: filters.location,
        mode: 'insensitive'
      };
    }
    
    if (filters.minPrice || filters.maxPrice) {
      where.priceCents = {};
      if (filters.minPrice) where.priceCents.gte = filters.minPrice;
      if (filters.maxPrice) where.priceCents.lte = filters.maxPrice;
    }
    
    if (filters.dateFrom || filters.dateTo) {
      where.AND = [];
      if (filters.dateFrom) {
        where.AND.push({ availableFrom: { lte: filters.dateFrom } });
      }
      if (filters.dateTo) {
        where.AND.push({ availableTo: { gte: filters.dateTo } });
      }
    }

    const [items, total] = await Promise.all([
      prisma.inventoryItem.findMany({
        where,
        include: {
          provider: true,
          hotel: true,
          flight: true,
          car: true
        },
        orderBy: { priceCents: 'asc' },
        take: filters.limit || 20,
        skip: filters.offset || 0
      }),
      prisma.inventoryItem.count({ where })
    ]);

    return { items, total };
  }

  /**
   * Get inventory item by ID
   */
  static async getInventoryItemById(itemId: string) {
    return await prisma.inventoryItem.findUnique({
      where: { id: itemId },
      include: {
        provider: true,
        hotel: true,
        flight: true,
        car: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });
  }

  /**
   * Update inventory availability
   */
  static async updateAvailability(itemId: string, isAvailable: boolean) {
    return await prisma.inventoryItem.update({
      where: { id: itemId },
      data: { 
        isAvailable,
        updatedAt: new Date()
      }
    });
  }
}

export default InventoryService;
