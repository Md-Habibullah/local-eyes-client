/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type TourImageGalleryProps = {
    images: string[];
    tourTitle: string;
};

export default function TourImageGallery({ images, tourTitle }: TourImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

    const handleImageLoad = (imageUrl: string) => {
        setLoadedImages(prev => new Set(prev).add(imageUrl));
    };

    const handleImageError = (imageUrl: string) => {
        setErrorImages(prev => new Set(prev).add(imageUrl));
    };

    const nextImage = () => {
        setSelectedImage(prev => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage(prev => (prev - 1 + images.length) % images.length);
    };

    const openModal = (index: number) => {
        setSelectedImage(index);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;

            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, selectedImage, images.length, nextImage, prevImage]);

    if (!images || images.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No Images Available
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    This tour doesn&apos;t have any images yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Main Image Display */}
            <div className="relative group">
                <div
                    className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer"
                    onClick={() => openModal(selectedImage)}
                >
                    {errorImages.has(images[selectedImage]) ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
                            <p className="text-gray-500">Failed to load image</p>
                        </div>
                    ) : (
                        <Image
                            src={images[selectedImage]}
                            alt={`${tourTitle} - Image ${selectedImage + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70vw"
                            priority
                            onLoad={() => handleImageLoad(images[selectedImage])}
                            onError={() => handleImageError(images[selectedImage])}
                        />
                    )}

                    {/* Navigation Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-4 right-4">
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                                <Maximize2 className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white text-sm font-medium">Image {selectedImage + 1} of {images.length}</p>
                                    <p className="text-white/80 text-xs">Click to view fullscreen</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
                                        disabled={images.length === 1}
                                    >
                                        <ChevronLeft className="w-5 h-5 text-white" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
                                        disabled={images.length === 1}
                                    >
                                        <ChevronRight className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                {images.map((imageUrl, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-200 ${selectedImage === index
                            ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105'
                            : 'hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600 hover:scale-[1.02]'
                            }`}
                    >
                        {errorImages.has(imageUrl) ? (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                        ) : (
                            <Image
                                src={imageUrl}
                                alt={`${tourTitle} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                                onLoad={() => handleImageLoad(imageUrl)}
                                onError={() => handleImageError(imageUrl)}
                            />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{index + 1}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Image Counter */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {selectedImage + 1} of {images.length} images
                </div>
                <button
                    onClick={() => openModal(selectedImage)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2"
                >
                    <Maximize2 className="w-4 h-4" />
                    View fullscreen
                </button>
            </div>

            {/* Fullscreen Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 md:left-8 z-10 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors disabled:opacity-50"
                        disabled={images.length === 1}
                    >
                        <ChevronLeft className="w-8 h-8 text-white" />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 md:right-8 z-10 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors disabled:opacity-50"
                        disabled={images.length === 1}
                    >
                        <ChevronRight className="w-8 h-8 text-white" />
                    </button>

                    <div className="relative w-full max-w-6xl h-full max-h-[80vh]">
                        {errorImages.has(images[selectedImage]) ? (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <ImageIcon className="w-20 h-20 text-gray-400 mb-4" />
                                <p className="text-gray-300 text-lg">Failed to load image</p>
                            </div>
                        ) : (
                            <Image
                                src={images[selectedImage]}
                                alt={`${tourTitle} - Fullscreen view`}
                                fill
                                className="object-contain"
                                sizes="100vw"
                            />
                        )}
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-2 h-2 rounded-full transition-all ${selectedImage === index
                                    ? 'bg-white w-6'
                                    : 'bg-white/50 hover:bg-white/70'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="absolute bottom-4 left-4 text-white/80 text-sm">
                        Image {selectedImage + 1} of {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}