/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Image from "next/image";
import { Camera, Images } from "lucide-react";
import { useState } from "react";

const TourImages = ({ images }: { images: string[] }) => {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

    const handleImageLoad = (imageUrl: string) => {
        setLoadedImages(prev => new Set(prev).add(imageUrl));
    };

    const handleImageError = (imageUrl: string) => {
        setErrorImages(prev => new Set(prev).add(imageUrl));
    };

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-48 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center group">
                <div className="relative">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-800/30 dark:to-indigo-800/30 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Camera className="w-8 h-8 text-blue-400 dark:text-blue-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">0</span>
                    </div>
                </div>
                <span className="text-blue-500 dark:text-blue-400 text-sm font-medium mt-2">No images available</span>
                <span className="text-gray-400 dark:text-gray-500 text-xs mt-1">Add images to showcase</span>
            </div>
        );
    }

    // For 1 image - Full width with elegant overlay
    if (images.length === 1) {
        return (
            <div className="relative w-full h-48 overflow-hidden rounded-t-2xl group">
                {errorImages.has(images[0]) ? (
                    <div className="w-full h-full bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex flex-col items-center justify-center">
                        <Camera className="w-8 h-8 text-blue-400 dark:text-blue-500 mb-2" />
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Image unavailable</span>
                    </div>
                ) : (
                    <>
                        <Image
                            src={images[0]}
                            alt="Tour image"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            onLoad={() => handleImageLoad(images[0])}
                            onError={() => handleImageError(images[0])}
                        />
                        {/* Elegant linear overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {/* Image counter badge */}
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                            <Images className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">1 photo</span>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // For 2 images - Side by side layout
    if (images.length === 2) {
        return (
            <div className="w-full h-48 overflow-hidden rounded-t-2xl flex gap-0.5 group">
                {images.slice(0, 2).map((src, index) => (
                    <div key={index} className="relative flex-1 overflow-hidden">
                        {errorImages.has(src) ? (
                            <div className="w-full h-full bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                                <Camera className="w-6 h-6 text-blue-400 dark:text-blue-500" />
                            </div>
                        ) : (
                            <>
                                <Image
                                    src={src}
                                    alt={`Tour image ${index + 1}`}
                                    fill
                                    className={`object-cover transition-transform duration-700 ease-out ${index === 0
                                        ? 'group-hover:scale-110 translate-x-0.5'
                                        : 'group-hover:scale-110 -translate-x-0.5'
                                        }`}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16.5vw"
                                    onLoad={() => handleImageLoad(src)}
                                    onError={() => handleImageError(src)}
                                />
                                {/* Subtle overlay on hover */}
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </>
                        )}
                    </div>
                ))}
                {/* Unified counter badge */}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <Images className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">2 photos</span>
                </div>
            </div>
        );
    }

    // For 3 images - 1 large + 2 small layout
    return (
        <div className="w-full h-48 overflow-hidden rounded-t-2xl grid grid-cols-2 gap-0.5 group">
            {/* Large left image - spans 2 rows */}
            <div className="relative row-span-2 overflow-hidden">
                {errorImages.has(images[0]) ? (
                    <div className="w-full h-full bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-blue-400 dark:text-blue-500" />
                    </div>
                ) : (
                    <>
                        <Image
                            src={images[0]}
                            alt="Tour image 1"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16.5vw"
                            priority
                            onLoad={() => handleImageLoad(images[0])}
                            onError={() => handleImageError(images[0])}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                )}
            </div>

            {/* Right column - 2 small images stacked */}
            {images.slice(1, 3).map((src, index) => (
                <div key={index + 1} className="relative overflow-hidden">
                    {errorImages.has(src) ? (
                        <div className="w-full h-full bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                            <Camera className="w-5 h-5 text-blue-400 dark:text-blue-400" />
                        </div>
                    ) : (
                        <>
                            <Image
                                src={src}
                                alt={`Tour image ${index + 2}`}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12.5vw, 8.25vw"
                                onLoad={() => handleImageLoad(src)}
                                onError={() => handleImageError(src)}
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </>
                    )}
                </div>
            ))}

            {/* Counter badge */}
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                <Images className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{images.length} photos</span>
            </div>
        </div>
    );
};

export default TourImages;