import Image from "next/image";

const TourImages = ({ images }: { images: string[] }) => {
    if (!images || images.length === 0) {
        return (
            <Image
                src="/placeholder.jpg"
                alt="No image"
                width={300}
                height={200}
            />
        );
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            {images.map((src, index) => (
                <Image
                    key={index}
                    src={src}
                    alt={`Tour image ${index + 1}`}
                    width={300}
                    height={200}
                    className="rounded object-cover"
                />
            ))}
        </div>
    );
};

export default TourImages;
