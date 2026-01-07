import Image from "next/image";
import { Camera } from "lucide-react";

const TourImages = ({ images }: { images: string[] }) => {
    if (!images || images.length === 0) {
        return (
            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex flex-col items-center justify-center">
                <Camera className="w-12 h-12 text-blue-300 dark:text-blue-600" />
                <span className="text-blue-400 dark:text-blue-500 text-sm mt-2">No images available</span>
            </div>
        );
    }

    if (images.length === 1) {
        return (
            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={images[0]}
                    alt="Tour image"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-1 h-48 overflow-hidden rounded-t-2xl">
            {images.slice(0, 4).map((src, index) => (
                <div key={index} className="relative overflow-hidden">
                    <Image
                        src={src}
                        alt={`Tour image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                    {index === 3 && images.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{images.length - 4}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TourImages;