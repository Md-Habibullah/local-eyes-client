import { z } from "zod";

export enum TourCategory {
    FOOD = "FOOD",
    ART = "ART",
    ADVENTURE = "ADVENTURE",
    HISTORY = "HISTORY",
    NATURE = "NATURE",
    SHOPPING = "SHOPPING",
    PHOTOGRAPHY = "PHOTOGRAPHY",
    NIGHTLIFE = "NIGHTLIFE",
    CULTURE = "CULTURE",
    SPORTS = "SPORTS",
}

export const createTourSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    itinerary: z.string().min(10),
    price: z.number().int().positive(),
    duration: z.number().int().positive(),
    durationType: z.string().optional(),
    meetingPoint: z.string(),
    maxGroupSize: z.number().int().positive(),
    category: z.nativeEnum(TourCategory),
    city: z.string(),
    country: z.string().optional(),
});

export const updateTourSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    itinerary: z.string().min(10).optional(),
    price: z.number().int().positive().optional(),
    duration: z.number().int().positive().optional(),
    durationType: z.string().optional(),
    meetingPoint: z.string().optional(),
    maxGroupSize: z.number().int().positive().optional(),
    category: z.nativeEnum(TourCategory).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
});